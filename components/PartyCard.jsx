'use client'
import { useFruitBox } from '@/lib/context'

function BalanceChip({ label, data, color }) {
  const total = data.small + data.medium + data.large
  if (total === 0) return null

  const bgCls = color === 'orange' ? 'bg-brand-orange-lt text-brand-orange' : 'bg-brand-green-lt text-brand-green'

  return (
    <div className={`rounded-xl px-3 py-2 text-xs font-semibold ${bgCls}`}>
      <div className="font-bold text-[11px] uppercase tracking-wider mb-1 opacity-70">{label}</div>
      <div className="flex gap-2 flex-wrap">
        {data.small  > 0 && <span>S:{data.small}</span>}
        {data.medium > 0 && <span>M:{data.medium}</span>}
        {data.large  > 0 && <span>L:{data.large}</span>}
      </div>
    </div>
  )
}

export default function PartyCard({ partyId }) {
  const { parties, getPartyBalance } = useFruitBox()
  const party = parties.find(p => p.id === partyId)
  if (!party) return null

  const balance = getPartyBalance(partyId)
  const giveTotal = balance.toGive.small + balance.toGive.medium + balance.toGive.large
  const recvTotal = balance.toReceive.small + balance.toReceive.medium + balance.toReceive.large
  const settled = giveTotal === 0 && recvTotal === 0

  const catColor = party.category === 'customer' ? 'text-brand-blue' : 'text-brand-purple'

  return (
    <div className="bg-white border border-brand-border rounded-2xl p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-bold text-gray-800 text-base">{party.name}</div>
          <div className={`text-xs font-semibold capitalize mt-0.5 ${catColor}`}>
            {party.category}
          </div>
        </div>
      </div>
      {settled ? (
        <div className="text-xs text-gray-400 italic">All settled ✓</div>
      ) : (
        <div className="flex gap-2 flex-wrap">
          <BalanceChip label="To Give"    data={balance.toGive}    color="orange" />
          <BalanceChip label="To Receive" data={balance.toReceive} color="green"  />
        </div>
      )}
    </div>
  )
}
