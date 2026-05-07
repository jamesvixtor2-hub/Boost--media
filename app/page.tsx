'use client'
import { useState } from 'react'

export default function Home() {
  const [link, setLink] = useState('')
  const [service, setService] = useState('1K Followers - ₦2,000')

  const services = [
    '1K TikTok Followers - ₦2,000',
    '5K TikTok Followers - ₦9,000', 
    '1K TikTok Likes - ₦1,500',
    '10K TikTok Views - ₦3,000',
  ]

  const handleOrder = () => {
    if (!link) {
      alert('Abeg paste your TikTok link first')
      return
    }
    const message = `Hello Boost Media! I want to order: ${service}. My TikTok link: ${link}. I will pay to Opay 7048755840`
    window.open(`https://wa.me/2347048755840?text=${encodeURIComponent(message)}`)
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto pt-10">
        <h1 className="text-3xl font-bold text-center mb-2">Boost Media</h1>
        <p className="text-center text-green-400 mb-8">Instant TikTok Boost 🚀</p>
        
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm mb-2">Select Service</label>
            <select 
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded text-white"
            >
              {services.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">TikTok Link / Username</label>
            <input 
              type="text"
              placeholder="@username or video link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded text-white"
            />
          </div>

          <button 
            onClick={handleOrder}
            className="w-full bg-green-500 hover:bg-green-600 p-4 rounded-lg font-bold text-lg"
          >
            Order Now on WhatsApp
          </button>
        </div>

        <div className="mt-8 text-center bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Pay to Opay:</p>
          <p className="text-xl font-bold text-green-400">7048755840</p>
          <p className="text-xs text-gray-500 mt-1">Send proof on WhatsApp after payment</p>
        </div>
      </div>
    </main>
  )
}
