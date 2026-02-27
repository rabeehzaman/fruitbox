'use client'
import { useState } from 'react'
import { useFruitBox } from '@/lib/context'
import ScreenHeader from '@/components/ScreenHeader'
import PartyCard from '@/components/PartyCard'
import AddPartyModal from '@/components/AddPartyModal'
import Toast from '@/components/Toast'

export default function PartyPage() {
  const { parties } = useFruitBox()
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const filtered = parties
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScreenHeader title="Parties" />

      <div className="sticky top-0 z-10 bg-white border-b border-brand-border px-4 py-3 flex gap-2 shadow-sm">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search parties..."
          className="flex-1 border-2 border-brand-border rounded-xl px-4 py-2.5 text-base focus:outline-none focus:border-brand-green"
        />
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-green text-white font-bold text-2xl hover:bg-brand-green-dk transition-colors shadow-sm"
          aria-label="Add party"
        >
          +
        </button>
      </div>

      <main className="flex-1 p-4 flex flex-col gap-3 max-w-lg mx-auto w-full">
        {filtered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🏪</div>
            {parties.length === 0 ? (
              <>
                <p className="text-gray-500 font-medium">No parties yet</p>
                <p className="text-gray-400 text-sm mt-1">Tap + to add your first party</p>
              </>
            ) : (
              <p className="text-gray-400 italic">No parties match &ldquo;{query}&rdquo;</p>
            )}
          </div>
        ) : (
          filtered.map(p => <PartyCard key={p.id} partyId={p.id} />)
        )}
      </main>

      <AddPartyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={party => setToast({ message: `${party.name} added!`, type: 'success' })}
      />

      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  )
}
