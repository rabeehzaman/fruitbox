'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { collection, onSnapshot, addDoc } from 'firebase/firestore'
import { db } from './firebase'

const FruitBoxContext = createContext(null)

export function FruitBoxProvider({ children }) {
  const [parties, setParties] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loaded, setLoaded] = useState(false)

  // Real-time listener — parties (no orderBy, sort client-side)
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'parties'),
      snap => {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        data.sort((a, b) => a.name.localeCompare(b.name))
        setParties(data)
        setLoaded(true)
      },
      err => console.error('parties onSnapshot error:', err)
    )
    return unsub
  }, [])

  // Real-time listener — transactions (no orderBy, sort client-side)
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'transactions'),
      snap => {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        data.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
        setTransactions(data)
      },
      err => console.error('transactions onSnapshot error:', err)
    )
    return unsub
  }, [])

  async function addParty(partyData) {
    await addDoc(collection(db, 'parties'), partyData)
  }

  async function addTransaction(txData) {
    await addDoc(collection(db, 'transactions'), txData)
  }

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
    <FruitBoxContext.Provider value={{
      parties, transactions, loaded,
      addParty, addTransaction,
      getPartyBalance, getReportData
    }}>
      {children}
    </FruitBoxContext.Provider>
  )
}

export const useFruitBox = () => useContext(FruitBoxContext)
