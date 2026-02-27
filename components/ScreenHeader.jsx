'use client'
import { useRouter } from 'next/navigation'

export default function ScreenHeader({ title }) {
  const router = useRouter()
  return (
    <header className="flex items-center gap-3 bg-brand-green px-4 py-4 text-white">
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-brand-green-dk transition-colors"
        aria-label="Go back"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
      </button>
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
    </header>
  )
}
