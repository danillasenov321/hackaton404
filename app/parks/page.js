// app/parks/page.js
'use client'
import { useState } from 'react'
import { locations } from '../../lib/data'
import BottomNavigation from '../../components/BottomNavigation'

export default function ParksPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFeature, setActiveFeature] = useState('all')
  
  const parkLocations = locations.filter(location => location.category === 'park')

  const features = [
    { id: 'all', name: 'Все', icon: '🌳' },
    { id: 'walking', name: 'Прогулки', icon: '🚶' },
    { id: 'sports', name: 'Спорт', icon: '⚽' },
    { id: 'playground', name: 'Детские', icon: '🎠' },
    { id: 'nature', name: 'Природа', icon: '🌸' }
  ]

  const parkFeatures = [
    { icon: '🚶', label: 'Прогулочные дорожки' },
    { icon: '🏞️', label: 'Живописные виды' },
    { icon: '⚽', label: 'Спортивные площадки' },
    { icon: '🎠', label: 'Детские городки' },
    { icon: '🍦', label: 'Кафе' },
    { icon: '🚻', label: 'Удобства' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/30 to-teal-50/30 pb-20">
      {/* Шапка с природным градиентом */}
      <header className="bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-strong">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
              🌳
            </div>
            <div>
              <h1 className="text-3xl font-bold">Парки и отдых</h1>
              <p className="opacity-90">Зеленые зоны Донецка</p>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative max-w-2xl">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Поиск парков, скверов, зон отдыха..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70"
            />
          </div>
        </div>
      </header>

      {/* Особенности парков */}
      <section className="container py-6">
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Что есть в парках</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {parkFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center text-lg mx-auto mb-2 group-hover:scale-110 transition-transform">
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
          {features.map(feature => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
                activeFeature === feature.id
                  ? 'bg-white text-emerald-600 shadow-medium'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-soft'
              }`}
            >
              <span>{feature.icon}</span>
              <span>{feature.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Сетка парков */}
      <section className="container">
        <div className="grid gap-6 md:grid-cols-2">
          {parkLocations.map((location, index) => (
            <div 
              key={location.id}
              className="bg-white rounded-3xl shadow-soft overflow-hidden hover-lift group border border-emerald-100"
            >
              {/* Верхняя часть с градиентом */}
              <div className={`h-48 relative overflow-hidden ${
                index % 2 === 0 ? 'gradient-forest' : 'gradient-mint'
              }`}>
                <div className="absolute inset-0 flex items-center justify-center text-5xl text-white">
                  {location.image}
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                  ⭐ {location.rating}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
                  📍 {location.distance || '1.5 км'}
                </div>
              </div>
              
              {/* Контент */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-xl text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {location.name}
                  </h3>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    {location.area || '12 га'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {location.description}
                </p>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>🕒</span>
                    <span>{location.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>💬</span>
                    <span>{location.reviews} отзывов</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-medium hover:shadow-soft transition-all text-center">
                    Маршрут
                  </button>
                  <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all">
                    ℹ️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Сообщение если нет результатов */}
        {parkLocations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌳</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Пока нет парков</h3>
            <p className="text-gray-500">Скоро здесь появятся лучшие парки Донецка</p>
          </div>
        )}
      </section>

      <BottomNavigation />
    </div>
  )
}