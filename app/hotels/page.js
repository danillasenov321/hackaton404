// app/hotels/page.js
'use client'
import { useState } from 'react'
import { locations } from '../../lib/data'
import BottomNavigation from '../../components/BottomNavigation'

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const hotelLocations = locations.filter(location => location.category === 'hotel')

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm">
        <div className="container py-4">
          <h1 className="text-xl font-semibold">🏨 Отели Донецка</h1>
        </div>
      </header>

      <div className="container py-6">
        <div className="grid gap-4">
          {hotelLocations.map(location => (
            <div key={location.id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{location.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                  <p className="text-gray-600 mb-2">{location.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📍 {location.address}</span>
                    <span>🕒 {location.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">{location.rating}</span>
                      <span className="text-gray-500">({location.reviews})</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                      Забронировать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}