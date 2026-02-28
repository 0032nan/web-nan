import React from 'react'
import { Search, Folder, ExternalLink, Edit2, Trash2, Check } from 'lucide-react'

const SearchResults = ({
  bookmarks,
  categories,
  onEdit,
  onDelete,
  onToggleSelect,
  selectedBookmarks,
}) => {
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.name || '未分类'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'focus':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'pending':
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'done':
        return '已完成'
      case 'focus':
        return '重点关注'
      case 'pending':
      default:
        return '待处理'
    }
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-web3-border flex items-center justify-center mb-4">
          <Search className="w-10 h-10 text-gray-500" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">未找到书签</h3>
        <p className="text-gray-400">尝试使用其他关键词搜索</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">
          搜索结果
          <span className="ml-2 text-sm text-gray-400">({bookmarks.length})</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {bookmarks.map((bookmark) => {
          const isSelected = selectedBookmarks.has(bookmark.id)

          return (
            <div
              key={bookmark.id}
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  e.preventDefault()
                  onToggleSelect(bookmark.id)
                }
              }}
              className={`
                relative group bg-web3-card border rounded-lg p-4 cursor-pointer
                transition-all duration-200
                ${isSelected
                  ? 'border-web3-accent ring-2 ring-web3-accent/30 bg-web3-accent/5'
                  : 'border-web3-border hover:border-web3-accent/50'
                }
              `}
            >
              {/* Selection Checkbox */}
              <div
                className={`
                  absolute top-3 left-3 w-5 h-5 rounded border-2 flex items-center justify-center
                  transition-all duration-200
                  ${isSelected
                    ? 'bg-web3-accent border-web3-accent'
                    : 'border-gray-600 bg-web3-dark/80 opacity-0 group-hover:opacity-100'
                  }
                `}
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleSelect(bookmark.id)
                }}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>

              {/* Content */}
              <div className="mt-6">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <Folder className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-400">
                    {getCategoryName(bookmark.category_id)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-medium text-white truncate pr-6" title={bookmark.title}>
                  {bookmark.title}
                </h3>

                {/* URL */}
                <p className="text-xs text-gray-500 truncate mt-1" title={bookmark.url}>
                  {new URL(bookmark.url).hostname}
                </p>

                {/* Description */}
                {bookmark.description && (
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                    {bookmark.description}
                  </p>
                )}

                {/* Tags */}
                {bookmark.tags && bookmark.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {bookmark.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs bg-web3-border text-gray-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {bookmark.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-web3-border text-gray-400 rounded-full">
                        +{bookmark.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-web3-border">
                  {/* Status Badge */}
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(bookmark.status)}`}>
                    {getStatusText(bookmark.status)}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(bookmark.url, '_blank')
                      }}
                      className="p-1.5 hover:bg-web3-accent/20 hover:text-web3-accent rounded-md transition-colors"
                      title="打开链接"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(bookmark)
                      }}
                      className="p-1.5 hover:bg-web3-accent/20 hover:text-web3-accent rounded-md transition-colors"
                      title="编辑"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(bookmark.id)
                      }}
                      className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-md transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchResults
