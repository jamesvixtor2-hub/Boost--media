'use client'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function getOrders() {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }

  async function markComplete(id: number) {
    await supabase.from('orders').update({ status: 'completed' }).eq('id', id)
    getOrders()
  }

  useEffect(() => { getOrders() }, [])

  if (loading) return <div className="p-8 text-white bg-black min-h-screen">Loading orders...</div>

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Boost Media Orders</h1>
      {orders.length === 0 ? <p>No orders yet.</p> : orders.map(order => (
        <div key={order.id} className="border border-gray-700 p-4 mb-4 rounded">
          <p><strong>Service:</strong> {order.service}</p>
          <p><strong>Link:</strong> {order.link}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Status:</strong> {order.status}</p>
          {order.status === 'pending' && (
            <button onClick={() => markComplete(order.id)} className="bg-green-600 px-4 py-2 mt-2 rounded">
              Mark Complete
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
