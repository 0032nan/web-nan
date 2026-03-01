import React, { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import './index.css'

// 可排序的分类组件
function SortableCategory({ cat, bookmarks }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: cat.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-web3-card border border-web3-border rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <button
          {...attributes}
          {...listeners}
          className="p-2 hover:bg-web3-border rounded cursor-grab"
        >
          ⋮⋮
        </button>
        <h2 className="text-xl font-semibold text-white">{cat.name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks
          .filter(b => b.category_id === cat.id)
          .map(b => (
            <a
              key={b.id}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-web3-dark border border-web3-border rounded-lg hover:border-web3-accent transition-colors"
            >
              <h3 className="font-medium text-web3-accent">{b.title}</h3>
            </a>
          ))}
      </div>
    </div>
  )
}

function App() {
  const [categories, setCategories] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('web3-bookmarks-data-v2')
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setCategories(parsed.categories || [])
        setBookmarks(parsed.bookmarks || [])
      } else {
        setCategories([
          { id: '1', name: 'DEX', order: 1 },
          { id: '2', name: '借贷', order: 2 },
        ])
        setBookmarks([
          { id: '1', title: 'Uniswap', url: 'https://uniswap.org', category_id: '1', order: 1 },
          { id: '2', title: 'Aave', url: 'https://aave.com', category_id: '2', order: 1 },
        ])
      }
      setLoading(false)
    } catch (err) {
      console.error('Error loading data:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-web3-dark flex items-center justify-center">
        <h1 className="text-web3-accent text-2xl">Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-web3-dark flex items-center justify-center">
        <h1 className="text-red-500 text-2xl">Error: {error}</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-web3-dark text-white p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-web3-accent mb-2">Web3 Bookmarks</h1>
        <p className="text-gray-400">Categories: {categories.length} | Bookmarks: {bookmarks.length}</p>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map(c => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {categories.map(cat => (
              <SortableCategory
                key={cat.id}
                cat={cat}
                bookmarks={bookmarks}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default App