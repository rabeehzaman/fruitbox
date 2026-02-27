'use client'
import { useState, useMemo } from 'react'
import { useFruitBox } from '@/lib/context'
import { getTodayDateStr } from '@/lib/utils'
import ScreenHeader from '@/components/ScreenHeader'
import ReportSection from '@/components/ReportSection'

export default function ReportPage() {
  const { getReportData } = useFruitBox()
  const [tab, setTab] = useState('customer')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const data = useMemo(
    () => getReportData(tab, fromDate || null, toDate || null),
    [getReportData, tab, fromDate, toDate]
  )

  function clearDates() {
    setFromDate('')
    setToDate('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScreenHeader title="Report" />

      {/* Tabs */}
      <div className="flex bg-white border-b border-brand-border shadow-sm">
        {['customer', 'supplier'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3.5 text-sm font-bold capitalize transition-colors border-b-2 ${
              tab === t
                ? t === 'customer'
                  ? 'border-brand-blue text-brand-blue'
                  : 'border-brand-purple text-brand-purple'
                : 'border-transparent text-gray-400'
            }`}
          >
            {t}s
          </button>
        ))}
      </div>

      {/* Date filter */}
      <div className="bg-white px-4 py-3 border-b border-brand-border flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1 flex-1 min-w-[130px]">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            className="border-2 border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-green w-full"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-[130px]">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">To</label>
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            className="border-2 border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-green w-full"
          />
        </div>
        {(fromDate || toDate) && (
          <button
            onClick={clearDates}
            className="text-xs text-gray-400 hover:text-gray-600 underline pb-2"
          >
            Clear
          </button>
        )}
      </div>

      <main className="flex-1 p-4 max-w-lg mx-auto w-full">
        <ReportSection data={data} category={tab} />
      </main>
    </div>
  )
}
