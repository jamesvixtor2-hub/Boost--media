'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NewOrder() {
  const [user, setUser] = useState<any>(null)
  const [category, setCategory] = useState('TikTok')
  const [service, setService] = useState('TikTok Followers [Super Real] - ₦5610 per 1000')
  const [link, setLink] = useState('')
  const [quantity, setQuantity] = useState(1000)
  const router = useRouter()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setUser(currentUser)
  }, [])

  const services = [
    'TikTok Video Views | ST - ₦252 per 1000',
    'TikTok - Saves | MQ 20K | R20 🔥🔥 - ₦705.6 per 1000', 
    'TikTok Followers [Current Drop 5%] - ₦4950 per 1000',
    'TikTok Followers [Super Real] - ₦5610 per 1000',
    'Twitter EUROPE Views - ₦58.88 per 1000',
    'Twitter Africa Views - ₦58.88 per 1000',
  ]

  const getPrice = () => {
    const price = parseFloat(service.match(/₦([\d.]+)/)?.[1] || '0')
    return ((price / 1000) * quantity).toFixed(2)
  }

  const handlePlaceOrder = () => {
    if (!user) {
      router.push('/login')
      return
    }
    if (!link) {
      alert('Please enter TikTok link')
      return
    }
    const totalPrice = parseFloat(getPrice())
    if (user.balance < totalPrice) {
      alert('Insufficient balance. Please add funds.')
      router.push('/add-fund')
      return
    }

    const newOrder = {
      id: Math.floor(100000 + Math.random() * 900000),
      service,
      link,
      quantity,
      price: totalPrice,
      status: 'Pending',
      date: new Date().toLocaleString()
    }

    const updatedUser = {
    ...user,
      balance: user.balance - totalPrice,
      orders: [newOrder,...user.orders || []]
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const newUsers = users.map((u: any) => u.id === user.id? updatedUser : u)
    localStorage.setItem('users', JSON.stringify(newUsers))
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    alert('Order placed successfully!')
    router.push('/orders')
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white pb-24">
      {/* Header */}
      <div className="bg-blue-950 p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-400">⚡ Boost Media</h1>
        <a href="https://wa.me/2347048755840" className="bg-green-500 px-3 py-2 rounded text-sm font-bold">
          CS: 07048755840
        </a>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-4">
        {user && (
          <div className="bg-blue-800 rounded-lg p-4 mb-4">
            <p className="text-blue-200 text-sm">Balance:</p>
            <p className="text-2xl font-bold text-orange-400">₦{user.balance?.toFixed(2) || '0.00'}</p>
          </div>
        )}

        <div className="bg-white text-gray-900 rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <span className="text-orange-500">⚡</span> Place Fast Order
          </h2>
          
          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg">
                <option>TikTok</option>
                <option>Twitter</option>
                <option>Instagram</option>
                <option>YouTube</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Service</label>
              <select value={service} onChange={(e) => setService(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm">
                {services.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">🔗 Target Link</label>
              <input type="text" placeholder="https://tiktok.com/@username/video/..." value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg" />
              <p className="text-xs text-gray-500 mt-1">Use post/video link for likes/views - profile links will not work</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex gap-2 mb-2">
                <input type="number" value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-center font-bold" />
              </div>
              <div className="flex gap-2">
                {[100, 1000, 10000, 50000, 1000000].map(q => (
                  <button key={q} onClick={() => setQuantity(q)} 
                    className="flex-1 bg-gray-100 hover:bg-orange-100 py-2 rounded text-sm">
                    +{q >= 1000? q/1000 + 'K' : q}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-3xl font-bold text-orange-500">₦{getPrice()}</p>
            </div>

            <div className="text-xs text-gray-600 space-y-2">
              <p>ℹ️ Do not submit multiple orders for the same link until the previous order is completed</p>
              <p>ℹ️ Do not change your username or make the account private during order processing</p>
            </div>

            <button onClick={handlePlaceOrder} className="w-full btn-primary text-lg">
              ✓ Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <a href="/dashboard" className="flex flex-col items-center text-gray-600 text-xs p-2">
            <span>🏠</span><span>Dashboard</span>
          </a>
          <a href="/" className="flex flex-col items-center text-orange-500 text-xs p-2 bg-orange-100 rounded-lg">
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
