import React, { useState, useEffect } from 'react'

function App() {
  const [categories, setCategories] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // 模拟从 localStorage 加载数据
      const savedData = localStorage.getItem('web3-bookmarks-data-v2')
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setCategories(parsed.categories || [])
        setBookmarks(parsed.bookmarks || [])
      } else {
        // 默认数据
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
      <div style={{ padding: '20px', color: 'white', background: '#0a0a1a', minHeight: '100vh' }}>
        <h1 style={{ color: '#00d4ff' }}>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', background: '#0a0a1a', minHeight: '100vh' }}>
        <h1>Error: {error}</h1>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', color: 'white', background: '#0a0a1a', minHeight: '100vh' }}>
      <h1 style={{ color: '#00d4ff' }}>Web3 Bookmarks</h1>
      <p>Categories: {categories.length}</p>
      <p>Bookmarks: {bookmarks.length}</p>
      <div>
        {categories.map(cat => (
          <div key={cat.id} style={{ margin: '10px 0', padding: '10px', background: '#1a1a2e', borderRadius: '5px' }}>
            <h3>{cat.name}</h3>
            <ul>
              {bookmarks
                .filter(b => b.category_id === cat.id)
                .map(b => (
                  <li key={b.id}>
                    <a href={b.url} style={{ color: '#00d4ff' }} target="_blank" rel="noopener noreferrer">
                      {b.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App