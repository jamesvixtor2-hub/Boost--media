'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AddFund() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!currentUser) router.push('/login')
    else setUser(currentUser)
  }, [])

  const addFunds = (amount: number) => {
    if (!user) return
    const updatedUser = {...user, balance: user.balance + amount }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const newUsers = users.map((u: any) => u.id === user.id? updatedUser : u)
    localStorage.setItem('users', JSON.stringify(newUsers))
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    setUser(updatedUser)
    alert(`₦${amount} added! Send proof to WhatsApp 07048755840`)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-blue-900 text-white pb-24">
      <div className="bg-blue-950 p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-orange-400">⚡ Boost Media</h1>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-4">
        <div className="bg-blue-800 rounded-lg p-4 mb-6">
          <p className="text-blue-200 text-sm">Balance:</p>
          <p className="text-3xl font-bold text-orange-400">₦{user.balance?.toFixed(2)}</p>
        </div>

        <div className="bg-white text-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Add Funds</h2>
          
          <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-6 mb-6">
            <p className="font-bold text-lg mb-4">Fund with Virtual Account</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Bank:</span>
                <span className="font-bold">Opay</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Number:</span>
                <span className="font-bold text-xl text-orange-500">7048755840</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Name:</span>
                <span className="font-bold">Victor Kelechi James</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Transfer to the account above and click a button below after payment</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[1000, 2000, 5000, 10000, 20000, 50000].map(amount => (
              <button key={amount} onClick={() => addFunds(amount)} 
                className="btn-secondary">
                I Paid ₦{amount.toLocaleString()}
              </button>
            ))}
          </div>

          <a href="https://wa.me/2347048755840?text=I%20just%20funded%20my%20Boost%20Media%20wallet" 
            className="block w-full btn-primary text-center mt-4">
            Send Proof on WhatsApp: 07048755840
          </a>
        </div>
      </div>

      {/* Bottom Nav - same as above */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <a href="/dashboard" className="flex flex-col items-center text-gray-600 text-xs p-2">
            <span>🏠</span><span>Dashboard</span>
          </a>
          <a href="/" className="flex flex-col items-center text-gray-600 text-xs p-2">
            <span>🚀</span><span>New Order</span>
          </a>
          <a href="/add-fund" className="flex flex-col items-center text-orange-500 text-xs p-2 bg-orange-100 rounded-lg">
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
