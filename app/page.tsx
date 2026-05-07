'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OrderPage() {
  const [user, setUser] = useState<any>(null)
  const [category, setCategory] = useState('TikTok')
  const [service, setService] = useState('1K TikTok Followers - ₦2,000')
  const [link, setLink] = useState('')
  const [quantity, setQuantity] = useState('1000')
  const router = useRouter()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setUser(currentUser)
  }, [])

  const services = {
    TikTok: [
      '1K TikTok Followers - ₦2,000',
      '5K TikTok Followers - ₦9,000',
      '1K TikTok Likes - ₦1,500',
      '10K TikTok Views - ₦3,000',
      '1K TikTok Shares - ₦2,500',
    ]
  }

  const getPrice = (serviceStr: string) => parseInt(serviceStr.match(/₦([\d,]+)/)?.[1].replace(',', '') || '0')

  // Option 1: Order with wallet - for logged in users
  const handleWalletOrder = () => {
    if (!user) {
      router.push('/login')
      return
    }
    if (!link) {
      alert('Abeg enter TikTok link')
      return
    }
    const price = getPrice(service)
    if (user.balance < price) {
      alert('Insufficient balance. Please add funds.')
      router.push('/dashboard')
      return
    }

    const newOrder = { id: Date.now(), service, link, quantity, status: 'Pending', price }
    const updatedUser = {
     ...user,
      balance: user.balance - price,
      orders: [newOrder,...user.orders]
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const newUsers = users.map((u: any) => u.id === user.id? updatedUser : u)
    localStorage.setItem('users', JSON.stringify(newUsers))
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    alert('Order placed! Check dashboard.')
    router.push('/dashboard')
  }

  // Option 2: Quick WhatsApp order - for guests like first version
  const handleWhatsAppOrder = () => {
    if (!link) {
      alert('Abeg paste your TikTok link first')
      return
    }
    const price = getPrice(service)
    const message = `*New Order - Boost Media*%0A%0AService: ${service}%0ALink: ${link}%0AQuantity: ${quantity}%0AAmount: ₦${price}%0A%0AI will pay to:%0AOpay: 7048755840%0AName: Victor Kelechi James%0A%0ASend proof after payment`
    window.open(`https://wa.me/2347048755840?text=${message}`)
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <div className="bg-blue-950 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Boost Media</h1>
          <div className="flex gap-2 md:gap-4">
            {user? (
              <>
                <a href="/dashboard" className="bg-blue-700 px-3 py-2 rounded text-xs md:text-sm">
                  Wallet: ₦{user.balance}
                </a>
                <a href="/dashboard" className="bg-green-500 px-3 py-2 rounded text-xs md:text-sm font-bold">
                  Dashboard
                </a>
              </>
            ) : (
              <>
                <a href="/login" className="bg-blue-700 px-3 py-2 rounded text-xs md:text-sm">Login</a>
                <a href="/register" className="bg-green-500 px-3 py-2 rounded text-xs md:text-sm font-bold">Sign Up</a>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-8">
        <div className="bg-blue-800 rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-bold mb-6">Create New Order</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-blue-200">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-blue-700 border-blue-600 rounded text-white">
                <option>TikTok</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-blue-200">Service</label>
              <select value={service} onChange={(e) => setService(e.target.value)}
                className="w-full p-3 bg-blue-700 border border-blue-600 rounded text-white">
                {services[category as keyof typeof services].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-blue-200">Link</label>
              <input type="text" placeholder="https://tiktok.com/@username" value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-3 bg-blue-700 border border-blue-600 rounded text-white placeholder-blue-300" />
            </div>

            <div>
              <label className="block text-sm mb-2 text-blue-200">Quantity</label>
              <input type="number" value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-3 bg-blue-700 border border-blue-600 rounded text-white" />
            </div>

            {/* TWO BUTTONS NOW */}
            {user? (
              <button onClick={handleWalletOrder}
                className="w-full bg-green-500 hover:bg-green-600 p-4 rounded-lg font-bold text-lg mt-6">
                Pay from Wallet - ₦{getPrice(service)}
              </button>
            ) : (
              <div className="space-y-3 mt-6">
                <button onClick={() => router.push('/login')}
                  className="w-full bg-green-500 hover:bg-green-600 p-4 rounded-lg font-bold text-lg">
                  Login to Pay from Wallet
                </button>
                <button onClick={handleWhatsAppOrder}
                  className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-lg font-bold text-lg border-2 border-green-400">
                  Quick Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-800 rounded-lg shadow-xl p-6 mt-6">
          <h3 className="font-bold text-lg mb-4 text-yellow-300">Account Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-blue-200">Bank:</span><span className="font-bold">Opay</span></div>
            <div className="flex justify-between"><span className="text-blue-200">Account Number:</span><span className="font-bold text-xl text-green-400">7048755840</span></div>
            <div className="flex justify-between"><span className="text-blue-200">Account Name:</span><span className="font-bold">Victor Kelechi James</span></div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-700">
            <a href="https://wa.me/2347048755840" className="block text-center bg-green-500 p-3 rounded font-bold">
              Customer Service: 07048755840
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
