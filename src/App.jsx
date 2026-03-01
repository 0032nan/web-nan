import React from 'react'

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      color: 'white', 
      background: '#0a0a1a', 
      minHeight: '100vh' 
    }}>
      <h1 style={{ color: '#00d4ff' }}>Web3 Bookmarks</h1>
      <p>This is a test message.</p>
      <button 
        style={{
          padding: '10px 20px',
          background: '#00d4ff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked!')}
      >
        Click Me
      </button>
    </div>
  )
}

export default App