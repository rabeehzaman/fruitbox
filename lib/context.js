'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const FruitBoxContext = createContext(null)

export function FruitBoxProvider({ children }) {
  const [parties, setParties] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setParties(JSON.parse(localStorage.getItem('fruitbox_parties') || '[]'))
    setTransactions(JSON.parse(localStorage.getItem('fruitbox_transactions') || '[]'))
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem('fruitbox_parties', JSON.stringify(parties))
  }, [parties, loaded])

  useEffect(() => {
    if (loaded) localStorage.setItem('fruitbox_transactions', JSON.stringify(transactions))
  }, [transactions, loaded])

  function getPartyBalance(partyId, fromDate = null, toDate = null) {
    const txns = transactions.filter(tx =>
      tx.partyId === partyId &&
      (!fromDate || tx.date >= fromDate) &&
      (!toDate   || tx.date <= toDate)
    )
    const net = { small: 0, medium: 0, large: 0 }
    for (const tx of txns) {
      const sign = tx.type === 'plus' ? 1 : -1
      net.small  += sign * (tx.small  || 0)
      net.medium += sign * (tx.medium || 0)
      net.large  += sign * (tx.large  || 0)
    }
    return {
      toGive:    { small: Math.max(0,  net.small), medium: Math.max(0,  net.medium), large: Math.max(0,  net.large) },
      toReceive: { small: Math.max(0, -net.small), medium: Math.max(0, -net.medium), large: Math.max(0, -net.large) }
    }
  }

  function getReportData(category, fromDate = null, toDate = null) {
    return parties
      .filter(p => p.category === category)
      .map(party => {
        const txns = transactions.filter(tx =>
          tx.partyId === party.id &&
          (!fromDate || tx.date >= fromDate) &&
          (!toDate   || tx.date <= toDate)
        )
        const totals = txns.reduce((acc, tx) => ({
          small:  acc.small  + (tx.small  || 0),
          medium: acc.medium + (tx.medium || 0),
          large:  acc.large  + (tx.large  || 0)
        }), { small: 0, medium: 0, large: 0 })
        return { party, ...totals, total: totals.small + totals.medium + totals.large }
      })
      .sort((a, b) => b.total - a.total)
  }

  return (
    <FruitBoxContext.Provider value={{ parties, setParties, transactions, setTransactions, getPartyBalance, getReportData }}>
      {children}
    </FruitBoxContext.Provider>
  )
}

export const useFruitBox = () => useContext(FruitBoxContext)
