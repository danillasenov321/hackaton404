// app/cafes/page.js
'use client'
import { useState } from 'react'
import { locations } from '../../lib/data'
import BottomNavigation from '../../components/BottomNavigation'

export default function CafesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  
  const cafeLocations = locations.filter(location => location.category === 'cafe')
  
  const filters = [
    { id: 'all', name: 'Все', icon: '🍽️' },
    { id: 'restaurant', name: 'Рестораны', icon: '🏮' },
    { id: 'cafe', name: 'Кафе', icon: '☕' },
    { id: 'fastfood', name: 'Фастфуд', icon: '🍔' },
    { id: 'bar', name: 'Бары', icon: '🍸' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-red-50/30 pb-20">
      {/* Шапка с градиентом */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-strong">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
              🍽️
            </div>
            <div>
              <h1 className="text-3xl font-bold">Кафе и рестораны</h1>
              <p className="opacity-90">Откройте вкусы Донецка</p>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative max-w-2xl">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Поиск ресторанов, кафе, баров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70"
            />
          </div>
        </div>
      </header>

      {/* Фильтры */}
      <section className="container -mt-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? 'bg-white text-orange-600 shadow-medium'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-soft'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Сетка заведений */}
      <section className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cafeLocations.map((location, index) => (
            <div 
              key={location.id}
              className="bg-white rounded-3xl shadow-soft overflow-hidden hover-lift group border border-orange-100"
            >
              {/* Верхняя часть с градиентом */}
              <div className={`h-32 relative overflow-hidden ${
                index % 3 === 0 ? 'gradient-sunset' : 
                index % 3 === 1 ? 'gradient-sunshine' : 'gradient-lavender'
              }`}>
                <div className="absolute inset-0 flex items-center justify-center text-4xl text-white">
                  {location.image}
                </div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                  ⭐ {location.rating}
                </div>
                <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
                  🕒 {location.workingHours}
                </div>
              </div>
              
              {/* Контент */}
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                  {location.name}
                </h3>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                  {location.description}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    {location.type || 'Кафе'}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    📍 {location.distance || '2.1 км'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>💬</span>
                    <span>{location.reviews} отзывов</span>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-medium hover:shadow-soft transition-all">
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Сообщение если нет результатов */}
        {cafeLocations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Пока нет заведений</h3>
            <p className="text-gray-500">Скоро здесь появятся лучшие кафе и рестораны Донецка</p>
          </div>
        )}
      </section>

      <BottomNavigation />
    </div>
  )
}
