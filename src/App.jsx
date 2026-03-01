import React, { useState, useEffect, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Search, Plus, Settings, Download, Upload, ExternalLink } from 'lucide-react'
import { localDB, supabase } from './lib/supabase'
import CategorySection from './components/CategorySection'
import AddBookmarkModal from './components/AddBookmarkModal'
import AddCategoryModal from './components/AddCategoryModal'
import SearchResults from './components/SearchResults'
import './index.css'

// 密码保护组件
function PasswordGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // 从 localStorage 检查是否已登录
  useEffect(() => {
    const auth = localStorage.getItem('web3-bookmarks-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // 默认密码: nan123 (你可以修改)
    if (password === 'nan123') {
      localStorage.setItem('web3-bookmarks-auth', 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('密码错误')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('web3-bookmarks-auth')
    setIsAuthenticated(false)
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-web3-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-web3-card border border-web3-border rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-web3-accent to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">W3</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Web3 Bookmarks</h1>
            <p className="text-gray-400">请输入密码访问</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入密码"
                className="w-full px-4 py-3 bg-web3-dark border border-web3-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-web3-accent focus:ring-1 focus:ring-web3-accent"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-3 bg-web3-accent hover:bg-web3-accent-hover text-white rounded-lg font-medium transition-colors"
            >
              进入
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            提示: 默认密码是 nan123
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {children}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 px-4 py-2 bg-web3-card border border-web3-border text-gray-400 rounded-lg hover:text-white transition-colors text-sm"
      >
        退出登录
      </button>
    </>
  )
}

function App() {
  const [categories, setCategories] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState(null)
  const [selectedBookmarks, setSelectedBookmarks] = useState(new Set())
  const [activeId, setActiveId] = useState(null)
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Load data on mount
  useEffect(() => {
    loadData()
    checkSupabaseConnection()
  }, [])

  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('count')
      setIsSupabaseConnected(!error)
    } catch {
      setIsSupabaseConnected(false)
    }
  }

  const loadData = () => {
    const cats = localDB.getCategories()
    const marks = localDB.getBookmarks()
    setCategories(cats.sort((a, b) => a.order - b.order))
    setBookmarks(marks)
  }

  const saveCategories = useCallback((newCategories) => {
    localDB.saveCategories(newCategories)
    setCategories(newCategories)
  }, [])

  const saveBookmarks = useCallback((newBookmarks) => {
    localDB.saveBookmarks(newBookmarks)
    setBookmarks(newBookmarks)
  }, [])

  // Drag and drop handlers for categories
  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    if (over && active.id !== over.id) {
      const isCategory = categories.some((c) => c.id === active.id)
      
      if (isCategory) {
        const oldIndex = categories.findIndex((c) => c.id === active.id)
        const newIndex = categories.findIndex((c) => c.id === over.id)
        
        const newCategories = arrayMove(categories, oldIndex, newIndex).map((cat, idx) => ({
          ...cat,
          order: idx + 1,
        }))
        
        saveCategories(newCategories)
      }
    }
  }

  // Bookmark operations
  const addBookmark = (bookmark) => {
    const categoryBookmarks = bookmarks.filter((b) => b.category_id === bookmark.category_id)
    const newBookmark = {
      ...bookmark,
      id: Date.now().toString(),
      order: categoryBookmarks.length + 1,
      created_at: new Date().toISOString(),
    }
    const newBookmarks = [...bookmarks, newBookmark]
    saveBookmarks(newBookmarks)
    setIsAddBookmarkOpen(false)
  }

  const updateBookmark = (updatedBookmark) => {
    const newBookmarks = bookmarks.map((b) =>
      b.id === updatedBookmark.id ? updatedBookmark : b
    )
    saveBookmarks(newBookmarks)
    setEditingBookmark(null)
    setIsAddBookmarkOpen(false)
  }

  const deleteBookmark = (id) => {
    if (confirm('确定要删除这个书签吗？')) {
      const newBookmarks = bookmarks.filter((b) => b.id !== id)
      saveBookmarks(newBookmarks)
      setSelectedBookmarks((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }

  // Category operations
  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      order: categories.length + 1,
    }
    const newCategories = [...categories, newCategory]
    saveCategories(newCategories)
    setIsAddCategoryOpen(false)
  }

  const deleteCategory = (id) => {
    if (confirm('确定要删除这个分类吗？该分类下的所有书签也将被删除。')) {
      const newCategories = categories.filter((c) => c.id !== id)
      const newBookmarks = bookmarks.filter((b) => b.category_id !== id)
      saveCategories(newCategories.map((c, idx) => ({ ...c, order: idx + 1 })))
      saveBookmarks(newBookmarks)
    }
  }

  // Bulk operations
  const toggleBookmarkSelection = (id) => {
    setSelectedBookmarks((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const openSelectedBookmarks = () => {
    const selectedUrls = bookmarks
      .filter((b) => selectedBookmarks.has(b.id))
      .map((b) => b.url)
    
    selectedUrls.forEach((url) => {
      window.open(url, '_blank')
    })
  }

  const clearSelection = () => {
    setSelectedBookmarks(new Set())
  }

  // Import/Export
  const exportData = () => {
    const data = localDB.exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `web3-bookmarks-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          localDB.importData(e.target.result)
          loadData()
          alert('数据导入成功！')
        } catch (err) {
          alert('导入失败：文件格式错误')
        }
      }
      reader.readAsText(file)
    }
    event.target.value = ''
  }

  // Filter bookmarks by search
  const filteredBookmarks = searchQuery
    ? bookmarks.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  return (
    <PasswordGate>
      <div className="min-h-screen bg-web3-dark">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-web3-card/80 backdrop-blur-md border-b border-web3-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-web3-accent to-purple-600 flex items-center justify-center web3-glow">
                  <span className="text-white font-bold text-lg">W3</span>
                </div>
                <h1 className="text-xl font-bold text-white">Web3 Bookmarks</h1>
                {isSupabaseConnected && (
                  <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                    已同步
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索书签..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 bg-web3-dark border border-web3-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-web3-accent focus:ring-1 focus:ring-web3-accent"
                  />
                </div>

                {/* Bulk actions */}
                {selectedBookmarks.size > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-web3-accent/20 rounded-lg border border-web3-accent/30">
                    <span className="text-sm text-web3-accent">
                      已选择 {selectedBookmarks.size} 个
                    </span>
                    <button
                      onClick={openSelectedBookmarks}
                      className="p-1.5 hover:bg-web3-accent/20 rounded-md transition-colors"
                      title="一键打开"
                    >
                      <ExternalLink className="w-4 h-4 text-web3-accent" />
                    </button>
                    <button
                      onClick={clearSelection}
                      className="p-1.5 hover:bg-web3-accent/20 rounded-md transition-colors"
                      title="清除选择"
                    >
                      <span className="text-web3-accent text-lg leading-none">×</span>
                    </button>
                  </div>
                )}

                {/* Add buttons */}
                <button
                  onClick={() => setIsAddBookmarkOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-web3-accent hover:bg-web3-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  添加书签
                </button>

                <button
                  onClick={() => setIsAddCategoryOpen(true)}
                  className="p-2 hover:bg-web3-border rounded-lg transition-colors"
                  title="添加分类"
                >
                  <Settings className="w-5 h-5 text-gray-400" />
                </button>

                {/* Import/Export */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={exportData}
                    className="p-2 hover:bg-web3-border rounded-lg transition-colors"
                    title="导出数据"
                  >
                    <Download className="w-5 h-5 text-gray-400" />
                  </button>
                  <label className="p-2 hover:bg-web3-border rounded-lg transition-colors cursor-pointer" title="导入数据">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <input
                      type="file"
                      accept=".json"
                      onChange={importData}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {searchQuery ? (
            <SearchResults
              bookmarks={filteredBookmarks}
              categories={categories}
              onEdit={setEditingBookmark}
              onDelete={deleteBookmark}
              onToggleSelect={toggleBookmarkSelection}
              selectedBookmarks={selectedBookmarks}
            />
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={categories.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-6">
                  {categories.map((category) => (
                    <CategorySection
                      key={category.id}
                      category={category}
                      bookmarks={bookmarks.filter((b) => b.category_id === category.id)}
                      onEditBookmark={setEditingBookmark}
                      onDeleteBookmark={deleteBookmark}
                      onDeleteCategory={deleteCategory}
                      onToggleSelect={toggleBookmarkSelection}
                      selectedBookmarks={selectedBookmarks}
                      onReorderBookmarks={(newBookmarks) => {
                        const otherBookmarks = bookmarks.filter(
                          (b) => b.category_id !== category.id
                        )
                        saveBookmarks([...otherBookmarks, ...newBookmarks])
                      }}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </main>

        {/* Modals */}
        <AddBookmarkModal
          isOpen={isAddBookmarkOpen || editingBookmark !== null}
          onClose={() => {
            setIsAddBookmarkOpen(false)
            setEditingBookmark(null)
          }}
          onSubmit={editingBookmark ? updateBookmark : addBookmark}
          categories={categories}
          initialData={editingBookmark}
        />

        <AddCategoryModal
          isOpen={isAddCategoryOpen}
          onClose={() => setIsAddCategoryOpen(false)}
          onSubmit={addCategory}
        />
      </div>
    </PasswordGate>
  )
}

export default App