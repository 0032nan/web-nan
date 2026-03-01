import React, { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      console.log('App mounted')
      setData({ message: 'Hello Web3 Bookmarks!' })
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    }
  }, [])

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div style={{ padding: '20px', color: 'white', background: '#0a0a1a', minHeight: '100vh' }}>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', color: 'white', background: '#0a0a1a', minHeight: '100vh' }}>
      <h1 style={{ color: '#00d4ff' }}>{data.message}</h1>
      <p>If you can see this, React is working!</p>
    </div>
  )
}

export default App