import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { GripVertical, Trash2 } from 'lucide-react'
import BookmarkCard from './BookmarkCard'

const CategorySection = ({
  category,
  bookmarks,
  onEditBookmark,
  onDeleteBookmark,
  onDeleteCategory,
  onToggleSelect,
  selectedBookmarks,
  onReorderBookmarks,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleBookmarkDragEnd = (event) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = bookmarks.findIndex((b) => b.id === active.id)
      const newIndex = bookmarks.findIndex((b) => b.id === over.id)
      
      const reordered = [...bookmarks]
      const [draggedItem] = reordered.splice(oldIndex, 1)
      reordered.splice(newIndex, 0, draggedItem)
      
      onReorderBookmarks(reordered.map((b, idx) => ({ ...b, order: idx + 1 })))
    }
  }

  const sortedBookmarks = [...bookmarks].sort((a, b) => a.order - b.order)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-web3-card border border-web3-border rounded-xl overflow-hidden"
    >
      {/* Category Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-web3-dark/50 border-b border-web3-border">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="p-1 hover:bg-web3-border rounded cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-4 h-4 text-gray-500" />
          </button>
          <h2 className="text-lg font-semibold text-white">{category.name}</h2>
          <span className="px-2 py-0.5 text-xs bg-web3-border text-gray-400 rounded-full">
            {bookmarks.length}
          </span>
        </div>
        <button
          onClick={() => onDeleteCategory(category.id)}
          className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"
          title="删除分类"
        >
          <Trash2 className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Bookmarks Grid */}
      <div className="p-4">
        {bookmarks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>暂无书签</p>
            <p className="text-sm mt-1">点击"添加书签"按钮添加</p>
          </div>
        ) : (
          <SortableContext
            items={sortedBookmarks.map((b) => b.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  isSelected={selectedBookmarks.has(bookmark.id)}
                  onEdit={() => onEditBookmark(bookmark)}
                  onDelete={() => onDeleteBookmark(bookmark.id)}
                  onToggleSelect={() => onToggleSelect(bookmark.id)}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  )
}

export default CategorySection
