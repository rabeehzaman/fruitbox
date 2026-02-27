'use client'
import { useRouter } from 'next/navigation'

const NAV = [
  {
    href: '/plus',
    label: 'Plus',
    sub: 'Boxes Received',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    ),
    from: '#2E7D32',
    to: '#388E3C',
  },
  {
    href: '/minus',
    label: 'Minus',
    sub: 'Boxes Given',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12h8"/>
      </svg>
    ),
    from: '#E65100',
    to: '#F57C00',
  },
  {
    href: '/party',
    label: 'Parties',
    sub: 'Manage Parties',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    from: '#6A1B9A',
    to: '#7B1FA2',
  },
  {
    href: '/report',
    label: 'Report',
    sub: 'View Reports',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M8 12h8M8 8h5M8 16h3"/>
      </svg>
    ),
    from: '#01579B',
    to: '#0277BD',
  },
]

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      {/* App header */}
      <header
        className="px-5 py-5 text-white"
        style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">📦</span>
          <div>
            <h1 className="text-2xl font-bold leading-tight">Fruit Box Manager</h1>
            <p className="text-green-200 text-sm">Wholesale box tracking</p>
          </div>
        </div>
      </header>

      {/* 2×2 grid */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          {NAV.map(({ href, label, sub, icon, from, to }) => (
            <button
              key={href}
              onClick={() => router.push(href)}
              className="flex flex-col items-center justify-center gap-3 rounded-3xl text-white shadow-md active:scale-95 transition-transform"
              style={{
                minHeight: 150,
                background: `linear-gradient(135deg, ${from}, ${to})`,
              }}
            >
              {icon}
              <div className="text-center">
                <div className="text-xl font-bold leading-tight">{label}</div>
                <div className="text-xs opacity-80 mt-0.5">{sub}</div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
