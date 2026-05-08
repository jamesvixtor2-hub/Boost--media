'use client'
import { useState } from 'react'

const SERVICES = [
  { id: 1, name: 'TikTok Bio Setup', desc: 'Professional bio + link setup', price: 3000 },
  { id: 2, name: '30 Hashtags Research', desc: 'Viral hashtags for your niche', price: 5000 },
  { id: 3, name: 'Video Script Pack', desc: '5 hooks + scripts done for you', price: 8000 },
  { id: 4, name: 'Canva Post Design', desc: '1 professional graphic design', price: 5000 },
  { id: 5, name: 'Content Strategy Call', desc: '30min 1-on-1 WhatsApp call', price: 10000 },
]

export default function Home() {
  const [service, setService] = useState(SERVICES[0])
  const [quantity, setQuantity] = useState(1)
  const [link, setLink] = useState('')
  const [total, setTotal] = useState(3000)

  const updateTotal = (svc: any, qty: number) => {
    setTotal(svc.price * qty)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <h1 className="text-xl font-bold text-orange-500">Boost Media</h1>
          </div>
          <a href="https://wa.me/2347048755840" className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
            CS: 07048755840
          </a>
        </div>
      </header>

      {/* Hero + Order Form */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Place Fast Order</h2>
            <p className="text-gray-500">Real TikTok growth services. Delivered by humans.</p>
          </div>

          <div className="space-y-6">
            {/* Service Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Service</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                onChange={(e) => {
                  const svc = SERVICES.find(s => s.id === Number(e.target.value))
                  if(svc) { setService(svc); updateTotal(svc, quantity) }
                }}
              >
                {SERVICES.map(s => (
                  <option key={s.id} value={s.id}>{s.name} - ₦{s.price.toLocaleString()}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">{service.desc}</p>
            </div>

            {/* Link/Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">TikTok Username or Details</label>
              <input
                type="text"
                placeholder="@username or describe your niche"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                  value={quantity}
                  onChange={(e) => {
                    const qty = Number(e.target.value)
                    setQuantity(qty)
                    updateTotal(service, qty)
                  }}
                />
                <button onClick={() => {setQuantity(quantity + 1); updateTotal(service, quantity + 1)}}
                  className="px-4 bg-blue-100 text-blue-700 rounded-lg font-medium">+1</button>
                <button onClick={() => {setQuantity(quantity + 5); updateTotal(service, quantity + 5)}}
                  className="px-4 bg-blue-100 text-blue-700 rounded-lg font-medium">+5</button>
              </div>
            </div>

            {/* Total */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Price:</span>
                <span className="text-2xl font-bold text-blue-700">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-lg">
              Place Order - ₦{total.toLocaleString()}
            </button>

            <p className="text-xs text-center text-gray-500">
              Delivery: 24-48hrs. WhatsApp support: 07048755840
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-4xl mx-auto grid grid-cols-4 text-center text-xs">
          <a href="/dashboard" className="py-3 text-blue-600">
            <div>📊</div>Dashboard
          </a>
          <a href="/" className="py-3 text-orange-500 font-bold">
            <div>➕</div>New Order
          </a>
          <a href="/add-fund" className="py-3 text-blue-600">
            <div>💰</div>Add Fund
          </a>
          <a href="/orders" className="py-3 text-blue-600">
            <div>📋</div>Orders
          </a>
        </div>
      </nav>
    </div>
  )
}
