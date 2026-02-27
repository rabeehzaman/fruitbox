'use client'
import { useState } from 'react'
import { useFruitBox } from '@/lib/context'
import { getTodayDateStr } from '@/lib/utils'

export default function AddPartyModal({ open, onClose, onSaved }) {
  const { parties, addParty } = useFruitBox()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('customer')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  if (!open) return null

  async function handleSave() {
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Party name is required.')
      return
    }
    const dup = parties.find(p => p.name.toLowerCase() === trimmed.toLowerCase())
    if (dup) {
      setError('A party with this name already exists.')
      return
    }
    setSaving(true)
    try {
      await addParty({ name: trimmed, category, createdAt: getTodayDateStr() })
      setName('')
      setCategory('customer')
      setError('')
      onSaved({ name: trimmed })
      onClose()
    } catch (e) {
      setError('Failed to save. Please try again.')
      console.error('addParty error:', e)
    } finally {
      setSaving(false)
    }
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/40"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-lg bg-white rounded-t-3xl px-6 pt-6 pb-10 shadow-2xl"
           style={{ animation: 'slideUp 0.22s ease-out' }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">Add Party</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm font-semibold text-gray-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setError('') }}
            placeholder="e.g. Ahmed Fruit Shop"
            className="border-2 border-brand-border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-green"
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label className="text-sm font-semibold text-gray-600">Category</label>
          <div className="flex gap-3">
            {['customer', 'supplier'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 py-2.5 rounded-full font-semibold text-sm capitalize border-2 transition-colors ${
                  category === cat
                    ? cat === 'customer'
                      ? 'bg-brand-blue text-white border-brand-blue'
                      : 'bg-brand-purple text-white border-brand-purple'
                    : 'bg-white text-gray-500 border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3.5 rounded-2xl bg-brand-green text-white font-bold text-base hover:bg-brand-green-dk transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Party'}
        </button>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  )
}
