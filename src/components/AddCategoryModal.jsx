import React, { useState, useEffect } from 'react'
import { X, Folder, Palette } from 'lucide-react'

const ICONS = [
  { name: 'Folder', value: 'Folder' },
  { name: 'Globe', value: 'Globe' },
  { name: 'Star', value: 'Star' },
  { name: 'Heart', value: 'Heart' },
  { name: 'Zap', value: 'Zap' },
  { name: 'Shield', value: 'Shield' },
  { name: 'Lock', value: 'Lock' },
  { name: 'Key', value: 'Key' },
  { name: 'Wallet', value: 'Wallet' },
  { name: 'Coins', value: 'Coins' },
  { name: 'TrendingUp', value: 'TrendingUp' },
  { name: 'BarChart', value: 'BarChart' },
  { name: 'PieChart', value: 'PieChart' },
  { name: 'Activity', value: 'Activity' },
  { name: 'Layers', value: 'Layers' },
  { name: 'Box', value: 'Box' },
  { name: 'Database', value: 'Database' },
  { name: 'Server', value: 'Server' },
  { name: 'Cloud', value: 'Cloud' },
  { name: 'Cpu', value: 'Cpu' },
]

const COLORS = [
  { name: 'Indigo', value: '#6366f1', class: 'bg-indigo-500' },
  { name: 'Purple', value: '#8b5cf6', class: 'bg-purple-500' },
  { name: 'Blue', value: '#3b82f6', class: 'bg-blue-500' },
  { name: 'Cyan', value: '#06b6d4', class: 'bg-cyan-500' },
  { name: 'Teal', value: '#14b8a6', class: 'bg-teal-500' },
  { name: 'Emerald', value: '#10b981', class: 'bg-emerald-500' },
  { name: 'Green', value: '#22c55e', class: 'bg-green-500' },
  { name: 'Yellow', value: '#eab308', class: 'bg-yellow-500' },
  { name: 'Orange', value: '#f97316', class: 'bg-orange-500' },
  { name: 'Red', value: '#ef4444', class: 'bg-red-500' },
  { name: 'Pink', value: '#ec4899', class: 'bg-pink-500' },
  { name: 'Rose', value: '#f43f5e', class: 'bg-rose-500' },
]

const AddCategoryModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: 'Folder',
    color: '#6366f1',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        icon: 'Folder',
        color: '#6366f1',
      })
      setErrors({})
    }
  }, [isOpen])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = '请输入分类名称'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSubmit({
      name: formData.name.trim(),
      icon: formData.icon,
      color: formData.color,
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
      <div className="relative w-full max-w-md bg-web3-card border border-web3-border rounded-2xl shadow-2xl web3-glow">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-web3-border">
          <h2 className="text-xl font-semibold text-white">添加分类</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-web3-border rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              分类名称 <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Folder className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="输入分类名称"
                className={`w-full pl-10 pr-4 py-2.5 bg-web3-dark border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-web3-accent focus:ring-1 focus:ring-web3-accent transition-colors ${
                  errors.name ? 'border-red-500' : 'border-web3-border'
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              图标
            </label>
            <div className="grid grid-cols-7 gap-2">
              {ICONS.map((icon) => (
                <button
                  key={icon.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: icon.value })}
                  className={`aspect-square flex items-center justify-center rounded-lg border transition-all ${
                    formData.icon === icon.value
                      ? 'bg-web3-accent/20 border-web3-accent text-web3-accent'
                      : 'bg-web3-dark border-web3-border text-gray-400 hover:border-gray-500'
                  }`}
                  title={icon.name}
                >
                  <span className="text-xs font-medium">{icon.name[0]}</span>
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-gray-500">
              已选择: {formData.icon}
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              颜色
            </label>
            <div className="grid grid-cols-6 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, color: color.value })
                  }
                  className={`aspect-square rounded-lg ${color.class} transition-all ${
                    formData.color === color.value
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-web3-card scale-110'
                      : 'hover:scale-105'
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              预览
            </label>
            <div className="p-4 bg-web3-dark border border-web3-border rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${formData.color}20` }}
                >
                  <span
                    className="text-lg font-bold"
                    style={{ color: formData.color }}
                  >
                    {formData.name ? formData.name[0].toUpperCase() : '?'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">
                    {formData.name || '分类名称'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formData.icon} · {COLORS.find(c => c.value === formData.color)?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
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
              添加分类
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategoryModal
