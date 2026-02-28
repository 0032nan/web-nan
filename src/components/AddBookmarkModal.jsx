import React, { useState, useEffect } from 'react'
import { X, Link, FileText, Tag, Folder } from 'lucide-react'

const AddBookmarkModal = ({ isOpen, onClose, onSubmit, categories, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category_id: '',
    tags: '',
    status: 'pending',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        url: initialData.url || '',
        description: initialData.description || '',
        category_id: initialData.category_id || '',
        tags: initialData.tags ? initialData.tags.join(', ') : '',
        status: initialData.status || 'pending',
      })
    } else {
      setFormData({
        title: '',
        url: '',
        description: '',
        category_id: categories[0]?.id || '',
        tags: '',
        status: 'pending',
      })
    }
    setErrors({})
  }, [initialData, categories, isOpen])

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = '请输入标题'
    }
    if (!formData.url.trim()) {
      newErrors.url = '请输入链接'
    } else {
      try {
        new URL(formData.url)
      } catch {
        newErrors.url = '请输入有效的URL'
      }
    }
    if (!formData.category_id) {
      newErrors.category_id = '请选择分类'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const tags = formData.tags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter((t) => t)

    onSubmit({
      ...(initialData || {}),
      title: formData.title.trim(),
      url: formData.url.trim(),
      description: formData.description.trim(),
      category_id: formData.category_id,
      tags,
      status: formData.status,
      order: initialData?.order || 0,
    })
  }

  const handleClose = () => {
    onClose()
    setErrors({})
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-web3-card border border-web3-border rounded-2xl shadow-2xl web3-glow">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-web3-border">
          <h2 className="text-xl font-semibold text-white">
            {initialData ? '编辑书签' : '添加书签'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-web3-border rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              标题 <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="输入书签标题"
                className={`w-full pl-10 pr-4 py-2.5 bg-web3-dark border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-web3-accent focus:ring-1 focus:ring-web3-accent transition-colors ${
                  errors.title ? 'border-red-500' : 'border-web3-border'
                }`}
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-xs text-red-400">{errors.title}</p>
            )}
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              链接 <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="https://..."
                className={`w-full pl-10 pr-4 py-2.5 bg-web3-dark border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-web3-accent focus:ring-1 focus:ring-web3-accent transition-colors ${
                  errors.url ? 'border-red-500' : 'border-web3-border'
                }`}
              />
            </div>
            {errors.url && (
              <p className="mt-1 text-xs text-red-400">{errors.url}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              分类 <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Folder className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <select
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                className={`w-full pl-10 pr-4 py-2.5 bg-web3-dark border rounded-lg text-white focus:outline-none focus:border-web3-accent focus:ring-1 focus:ring-web3-accent transition-colors appearance-none ${
                  errors.category_id ? 'border-red-500' : 'border-web3-border'
                }`}
              >
                <option value="">选择分类</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.category_id && (
              <p className="mt-1 text-xs text-red-400">{errors.category_id}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="添加描述（可选）"
              rows={3}
              className="w-full px-4 py-2.5 bg-web3-dark border border-web3-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-web3-accent focus:ring-1 focus:ring-web3-accent transition-colors resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              标签
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="用逗号分隔多个标签"
                className="w-full pl-10 pr-4 py-2.5 bg-web3-dark border border-web3-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-web3-accent focus:ring-1 focus:ring-web3-accent transition-colors"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              状态
            </label>
            <div className="flex gap-3">
              {[
                { value: 'pending', label: '待处理', color: 'yellow' },
                { value: 'focus', label: '重点关注', color: 'purple' },
                { value: 'done', label: '已完成', color: 'emerald' },
              ].map((status) => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, status: status.value })
                  }
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    formData.status === status.value
                      ? `bg-${status.color}-500/20 border-${status.color}-500/50 text-${status.color}-400`
                      : 'bg-web3-dark border-web3-border text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 bg-web3-dark border border-web3-border text-gray-300 rounded-lg hover:bg-web3-border transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-web3-accent hover:bg-web3-accent-hover text-white rounded-lg font-medium transition-colors"
            >
              {initialData ? '保存修改' : '添加书签'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookmarkModal
