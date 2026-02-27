'use client'
import { useFruitBox } from '@/lib/context'

export default function PartySelect({ value, onChange }) {
  const { parties } = useFruitBox()
  const sorted = [...parties].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Party</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border-2 border-brand-border rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:border-brand-green"
      >
        <option value="">— Select a party —</option>
        {sorted.map(p => (
          <option key={p.id} value={p.id}>
            {p.name} ({p.category})
          </option>
        ))}
      </select>
    </div>
  )
}
