'use client'

const sizes = [
  { key: 'small',  label: 'Small',  emoji: '🟢' },
  { key: 'medium', label: 'Medium', emoji: '🟡' },
  { key: 'large',  label: 'Large',  emoji: '🔴' },
]

export default function BoxInputGrid({ values, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Box Quantities</label>
      <div className="grid grid-cols-3 gap-3">
        {sizes.map(({ key, label, emoji }) => (
          <div
            key={key}
            className="flex flex-col items-center gap-2 bg-white border-2 border-brand-border rounded-2xl p-3"
          >
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              pattern="[0-9]*"
              value={values[key] === 0 ? '' : values[key]}
              placeholder="0"
              onChange={e => {
                const raw = e.target.value
                onChange(key, raw === '' ? 0 : Math.max(0, parseInt(raw, 10) || 0))
              }}
              className="w-full text-center text-3xl font-bold text-brand-green border-none outline-none bg-transparent"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
