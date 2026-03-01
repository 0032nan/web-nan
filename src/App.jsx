import React, { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [categories, setCategories] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

      <div className="space-y-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-web3-card border border-web3-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">{cat.name}</h2>
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
        ))}
      </div>
    </div>
  )
}

export default App