'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function Home() {
  const [service, setService] = useState('')
  const [link, setLink] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error } = await supabase.from('orders').insert([{ 
      service, 
      link, 
      email, 
      status: 'pending' 
    }])

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Order placed! We will start in 24 hours.')
      setService('')
      setLink('')
      setEmail('')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8">Boost Media</h1>
        <p className="mb-8 text-gray-300">Buy real Instagram & TikTok growth</p>
        
        <form onSubmit={submitOrder} className="space-y-4">
          <input 
            type="text" 
            placeholder="Service: e.g. 1000 IG Followers" 
            value={service} 
            onChange={e => setService(e.target.value)}
            required
            className="w-full p-3 bg-gray-900 rounded border border-gray-700"
          />
          <input 
            type="url" 
            placeholder="Instagram/TikTok Link" 
            value={link} 
            onChange={e => setLink(e.target.value)}
            required
            className="w-full p-3 bg-gray-900 rounded border border-gray-700"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-900 rounded border border-gray-700"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full p-3 bg-green-600 rounded font-bold disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Buy Now'}
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </main>
  )
}
