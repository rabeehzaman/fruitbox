'use client'
import { useState, useEffect } from 'react'

export default function Toast({ message, type = 'success', onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onDone) onDone()
    }, 2800)
    return () => clearTimeout(timer)
  }, [onDone])

  if (!visible || !message) return null

  const bg = type === 'error' ? 'bg-red-600' : 'bg-brand-green'

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white font-medium shadow-lg text-sm transition-opacity ${bg}`}
      style={{ minWidth: 200, textAlign: 'center' }}
    >
      {message}
    </div>
  )
}
