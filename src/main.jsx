import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="color:red;padding:20px;">Error: Root element not found</div>'
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    console.log('React app mounted successfully')
  } catch (error) {
    console.error('Failed to mount React app:', error)
    rootElement.innerHTML = `<div style="color:red;padding:20px;">
      <h1>Error mounting app</h1>
      <pre>${error.message}</pre>
      <pre>${error.stack}</pre>
    </div>`
  }
}
