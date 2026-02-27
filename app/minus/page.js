'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFruitBox } from '@/lib/context'
import { getTodayDateStr } from '@/lib/utils'
import ScreenHeader from '@/components/ScreenHeader'
import PartySelect from '@/components/PartySelect'
import BoxInputGrid from '@/components/BoxInputGrid'
import Toast from '@/components/Toast'

const EMPTY_BOXES = { small: 0, medium: 0, large: 0 }

export default function MinusPage() {
  const router = useRouter()
  const { addTransaction } = useFruitBox()

  const [partyId, setPartyId] = useState('')
  const [date, setDate] = useState('')
  const [boxes, setBoxes] = useState({ ...EMPTY_BOXES })
  const [toast, setToast] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => { setDate(getTodayDateStr()) }, [])

  function handleBoxChange(key, val) {
    setBoxes(prev => ({ ...prev, [key]: val }))
  }

  async function handleSave() {
    if (!partyId) { setError('Please select a party.'); return }
    if (!date)    { setError('Please select a date.');  return }
    const total = boxes.small + boxes.medium + boxes.large
    if (total === 0) { setError('Enter at least one box quantity.'); return }

    addTransaction({
      partyId, type: 'minus',
      small: boxes.small, medium: boxes.medium, large: boxes.large,
      date, timestamp: Date.now(),
    }).catch(e => console.error('addTransaction error:', e))
    setToast({ message: 'Minus entry saved!', type: 'success' })
    setTimeout(() => router.push('/'), 600)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScreenHeader title="Minus Entry" />

      <main className="flex-1 p-4 flex flex-col gap-5 max-w-lg mx-auto w-full">
        <div className="border rounded-2xl px-4 py-3 text-sm font-medium"
             style={{ background: '#FFE0B2', borderColor: '#FFCC80', color: '#E65100' }}>
          Record boxes <strong>given to</strong> a party
        </div>

        <PartySelect value={partyId} onChange={v => { setPartyId(v); setError('') }} />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border-2 border-brand-border rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:border-brand-orange"
          />
        </div>

        <BoxInputGrid values={boxes} onChange={handleBoxChange} />

        {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-colors shadow-md mt-auto"
          style={{ background: '#E65100' }}
          onMouseEnter={e => e.currentTarget.style.background = '#BF360C'}
          onMouseLeave={e => e.currentTarget.style.background = '#E65100'}
        >
          Save Minus Entry
        </button>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  )
}
