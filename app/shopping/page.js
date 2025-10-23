// app/shopping/page.js
'use client'
import { useState } from 'react'
import { locations } from '../../lib/data'
import BottomNavigation from '../../components/BottomNavigation'

export default function ShoppingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeType, setActiveType] = useState('all')
  
  const shoppingLocations = locations.filter(location => location.category === 'shopping')

  const shopTypes = [
    { id: 'all', name: 'Все', icon: '🛍️' },
    { id: 'mall', name: 'ТЦ', icon: '🏬' },
    { id: 'clothing', name: 'Одежда', icon: '👕' },
    { id: 'electronics', name: 'Техника', icon: '📱' },
    { id: 'supermarket', name: 'Супермаркеты', icon: '🛒' }
  ]

  const shoppingFeatures = [
    { icon: '🅿️', label: 'Парковка' },
    { icon: '☕', label: 'Кафе' },
    { icon: '🎮', label: 'Развлечения' },
    { icon: '👗', label: 'Одежда' },
    { icon: '📱', label: 'Техника' },
    { icon: '🏷️', label: 'Акции' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50/30 to-fuchsia-50/30 pb-20">
      {/* Шапка с градиентом */}
      <header className="bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-strong">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
              🛍️
            </div>
            <div>
              <h1 className="text-3xl font-bold">Шопинг в Донецке</h1>
              <p className="opacity-90">Лучшие магазины и торговые центры</p>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative max-w-2xl">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Поиск магазинов, торговых центров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70"
            />
          </div>
        </div>
      </header>

      {/* Особенности шопинга */}
      <section className="container py-6">
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Что есть в торговых центрах</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {shoppingFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-lg mx-auto mb-2 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <span className="text-xs text-gray-600 font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Фильтры */}
      <section className="container mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {shopTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
                activeType === type.id
                  ? 'bg-white text-pink-600 shadow-medium'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-soft'
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Сетка магазинов */}
      <section className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shoppingLocations.map((location, index) => (
            <div 
              key={location.id}
              className="bg-white rounded-3xl shadow-soft overflow-hidden hover-lift group border border-pink-100"
            >
              {/* Верхняя часть с градиентом */}
              <div className={`h-32 relative overflow-hidden ${
                index % 3 === 0 ? 'gradient-sunset' : 
                index % 3 === 1 ? 'gradient-lavender' : 'gradient-ocean'
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
                <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-pink-600 transition-colors">
                  {location.name}
                </h3>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                  {location.description}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                    {location.type || 'Магазин'}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    📍 {location.distance || '2.3 км'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>💬</span>
                    <span>{location.reviews} отзывов</span>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-sm font-medium hover:shadow-soft transition-all">
                    Маршрут
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Сообщение если нет результатов */}
        {shoppingLocations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Пока нет магазинов</h3>
            <p className="text-gray-500">Скоро здесь появятся лучшие магазины Донецка</p>
          </div>
        )}
      </section>

      <BottomNavigation />
    </div>
  )
}