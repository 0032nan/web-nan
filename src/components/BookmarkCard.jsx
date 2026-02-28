import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ExternalLink, Edit2, Trash2, Check, GripVertical } from 'lucide-react'

const BookmarkCard = ({
  bookmark,
  index,
  isSelected,
  onEdit,
  onDelete,
  onToggleSelect,
  onReorder,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: bookmark.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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

  const handleClick = (e) => {
    // 如果点击的是操作按钮，不触发选择
    if (e.target.closest('.action-btn') || e.target.closest('.drag-handle')) {
      return
    }
    // 按住 Ctrl/Cmd 键时切换选择状态
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      onToggleSelect()
    }
  }

  const openBookmark = () => {
    window.open(bookmark.url, '_blank')
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`
        relative group bg-web3-dark border rounded-lg p-4 cursor-pointer
        transition-all duration-200 ease-out
        ${isSelected 
          ? 'border-web3-accent ring-2 ring-web3-accent/30 bg-web3-accent/5' 
          : 'border-web3-border hover:border-web3-accent/50 hover:-translate-y-0.5'
        }
        ${isDragging ? 'opacity-50 scale-[1.02]' : ''}
      `}
    >
      {/* Selection Checkbox */}
      <div
        className={`
          absolute top-2 left-2 w-5 h-5 rounded border-2 flex items-center justify-center
          transition-all duration-200
          ${isSelected 
            ? 'bg-web3-accent border-web3-accent' 
            : 'border-gray-600 bg-web3-dark/80 opacity-0 group-hover:opacity-100'
          }
        `}
        onClick={(e) => {
          e.stopPropagation()
          onToggleSelect()
        }}
      >
        {isSelected && <Check className="w-3 h-3 text-white" />}
      </div>

      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="drag-handle absolute top-2 right-2 p-1 hover:bg-web3-border rounded cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="w-3 h-3 text-gray-500" />
      </div>

      {/* Content */}
      <div className="mt-4">
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
                openBookmark()
              }}
              className="action-btn p-1.5 hover:bg-web3-accent/20 hover:text-web3-accent rounded-md transition-colors"
              title="打开链接"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className="action-btn p-1.5 hover:bg-web3-accent/20 hover:text-web3-accent rounded-md transition-colors"
              title="编辑"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="action-btn p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-md transition-colors"
              title="删除"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookmarkCard
