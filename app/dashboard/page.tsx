'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!currentUser) router.push('/login')
    else setUser(currentUser)
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-blue-900 text-white pb-24">
      <div className="bg-blue-950 p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-orange-400">⚡ Boost Media</h1>
        <p className="text-sm text-blue-200">Welcome, {user.email}</p>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 shadow-lg">
          <p className="text-orange-100 text-sm">Wallet Balance</p>
          <p className="text-4xl font-bold">₦{user.balance?.toFixed(2) || '0.00'}</p>
          <button onClick={() => router.push('/add-fund')} 
            className="mt-4 bg-white text-orange-500 px-6 py-2 rounded-lg font-bold">
            Add Funds
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <a href="/" className="bg-white text-gray-900 p-6 rounded-lg shadow text-center">
            <div className="text-3xl mb-2">🚀</div>
            <p className="font-bold">New Order</p>
          </a>
          <a href="/orders" className="bg-white text-gray-900 p-6 rounded-lg shadow text-center">
            <div className="text-3xl mb-2">📋</div>
            <p className="font-bold">My Orders</p>
            <p className="text-xs text-gray-500">{user.orders?.length || 0} total</p>
          </a>
        </div>

        <div className="bg-white text-gray-900 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Customer Service</h3>
          <a href="https://wa.me/2347048755840" className="block bg-green-500 text-white p-4 rounded-lg text-center font-bold">
            Chat on WhatsApp: 07048755840
          </a>
          <div className="mt-4 text-sm text-gray-600">
            <p><b>Opay:</b> 7048755840</p>
            <p><b>Name:</b> Victor Kelechi James</p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <a href="/dashboard" className="flex flex-col items-center text-orange-500 text-xs p-2 bg-orange-100 rounded-lg">
            <span>🏠</span><span>Dashboard</span>
          </a>
          <a href="/" className="flex flex-col items-center text-gray-600 text-xs p-2">
            <span>🚀</span><span>New Order</span>
          </a>
          <a href="/add-fund" className="flex flex-col items-center text-gray-600 text-xs p-2">
            <span>💳</span><span>Add Fund</span>
          </a>
          <a href="/orders" className="flex flex-col items-center text-gray-600 text-xs p-2">
            <span>📋</span><span>Orders</span>
          </a>
          <a href="https://wa.me/2347048755840" className="flex flex-col items-center text-gray-600 text-xs p-2">
            <span>📱</span><span>SMS</span>
          </a>
        </div>
      </div>
    </div>
  )
}
