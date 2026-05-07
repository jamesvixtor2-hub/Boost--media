import Link from 'next/link'

const packages = [
  { id: 1, name: '1,000 TikTok Followers', price: 2500, category: 'Followers' },
  { id: 2, name: '5,000 TikTok Followers', price: 10000, category: 'Followers' },
  { id: 3, name: '10,000 TikTok Followers', price: 18000, category: 'Followers' },
  { id: 4, name: '1,000 TikTok Likes', price: 1500, category: 'Likes' },
  { id: 5, name: '5,000 TikTok Likes', price: 6000, category: 'Likes' },
  { id: 6, name: '10,000 TikTok Views', price: 2000, category: 'Views' },
  { id: 7, name: '50,000 TikTok Views', price: 8000, category: 'Views' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-5xl font-bold mb-4">Boost Media</h1>
          <p className="text-xl text-gray-300 mb-8">Nigeria's #1 TikTok Growth Panel</p>
          <p className="text-lg text-green-400">Pay with Opay • Instant Delivery • 24/7 Support</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <div className="text-sm text-purple-400 mb-2">{pkg.category}</div>
              <h3 className="text-xl font-bold mb-3">{pkg.name}</h3>
              <div className="text-3xl font-bold text-green-400 mb-4">₦{pkg.price.toLocaleString()}</div>
              <Link 
                href={`/order?package=${pkg.id}`}
                className="block w-full bg-purple-600 hover:bg-purple-700 text-center py-3 rounded-lg font-bold transition"
              >
                Buy Now
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-400">
          <p>Opay: 7048755840 | WhatsApp: 07048755840</p>
        </div>
      </div>
    </main>
  )
}
