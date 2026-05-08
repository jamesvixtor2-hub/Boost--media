'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Orders() {
  const [user, setUser] = useState<any>(null)
  const [filter, setFilter] = useState('All')
  const router = useRouter()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!currentUser) router.push('/login')
    else setUser(currentUser)
  }, [])

  if (!user) return null

  const orders = user.orders || []
  const filteredOrders = filter === 'All' ? orders : orders.filter((o: any) => o.status === filter)

  return (
    <div className="min-h-screen bg-blue-900 text-white pb-24">
      <div className="bg-blue-950 p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-400">⚡ Boost Media</h1>
        <p className="text-sm">Balance: <span className="text-orange-400 font-bold">₦{user.balance?.toFixed(2)}</span></p>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order History</h2>
          <div className="flex gap-2">
            <button className="bg-orange-500 px-4 py-2 rounded-lg text-sm font-bold">Fund with Virtual Account</button>
            <button onClick={() => router.push('/add-fund')} className="bg-blue-700 px-4 py-2 rounded-lg text-sm">Add Fund</button>
          </div>
        </div>

        <div className="bg-white text-gray-900 rounded-lg p-4 mb-4">
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {['All', 'Pending', 'Processing', 'Completed'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
                {f}
              </button>
            ))}
          </div>

          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No orders yet. Place order now.</p>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order: any) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-500 p-2 rounded-lg">🎵</div>
                      <div>
                        <p className="font-bold">Order #{order.id}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      ✓ {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Link: <span className="text-blue-600">{order.link}</span></p>
                    <p>Quantity: {order.quantity} | Amount: ₦{order.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <a href="/dashboard" className="flex flex-col items-center text-gray-600 text-xs p-2">
            <span>🏠</span><span>Dashboard</span>
          </a>
          <a href="/" className="flex flex-col items-center text-gray-600 text-xs p-2">
            <span>🚀</span><span>New Order</span>
          </a>
          <a href="/add-fund" className="flex flex-col items-center text-gray-600 text-xs p-2">
            <span>💳</span><span>Add Fund</span>
          </a>
          <a href="/orders" className="flex flex-col items-center text-orange-500 text-xs p-2 bg-orange-100 rounded-lg">
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
