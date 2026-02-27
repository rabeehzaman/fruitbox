'use client'

export default function ReportSection({ data, category }) {
  const grandTotal = data.reduce((sum, r) => sum + r.total, 0)
  const grandSmall  = data.reduce((sum, r) => sum + r.small,  0)
  const grandMedium = data.reduce((sum, r) => sum + r.medium, 0)
  const grandLarge  = data.reduce((sum, r) => sum + r.large,  0)

  const accentCls = category === 'customer' ? 'text-brand-blue' : 'text-brand-purple'
  const borderCls = category === 'customer' ? 'border-brand-blue' : 'border-brand-purple'
  const bgCls     = category === 'customer' ? 'bg-blue-50' : 'bg-purple-50'

  return (
    <div className="flex flex-col gap-4">
      {/* Summary card */}
      <div className={`rounded-2xl border-2 ${borderCls} ${bgCls} p-4`}>
        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
          {category === 'customer' ? 'Customer' : 'Supplier'} Summary
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="text-center">
            <div className={`text-2xl font-bold ${accentCls}`}>{data.length}</div>
            <div className="text-xs text-gray-500">Parties</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${accentCls}`}>{grandTotal}</div>
            <div className="text-xs text-gray-500">Total Boxes</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${accentCls}`}>{grandSmall}</div>
            <div className="text-xs text-gray-500">Small</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${accentCls}`}>{grandMedium}</div>
            <div className="text-xs text-gray-500">Medium</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${accentCls}`}>{grandLarge}</div>
            <div className="text-xs text-gray-500">Large</div>
          </div>
        </div>
      </div>

      {/* Party rows */}
      {data.length === 0 ? (
        <p className="text-center text-gray-400 py-8 italic">No data for this period.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map(({ party, small, medium, large, total }) => (
            <div key={party.id} className="bg-white border border-brand-border rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-800">{party.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {[small > 0 && `S:${small}`, medium > 0 && `M:${medium}`, large > 0 && `L:${large}`].filter(Boolean).join('  ·  ') || 'No boxes'}
                </div>
              </div>
              <div className={`text-xl font-bold ${accentCls}`}>{total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
