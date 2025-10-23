'use client'
import { useState } from 'react'
import { locations } from '../../lib/data'
import BottomNavigation from '../../components/BottomNavigation'

export default function MuseumsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  
  const museumLocations = locations.filter(location => location.category === 'museum')

  const categories = [
    { id: 'all', name: 'Все', icon: '🏛️' },
    { id: 'history', name: 'История', icon: '📜' },
    { id: 'art', name: 'Искусство', icon: '🎨' },
    { id: 'science', name: 'Наука', icon: '🔬' },
    { id: 'culture', name: 'Культура', icon: '📚' }
  ]

  const museumFeatures = [
    { icon: '🎨', label: 'Картины' },
    { icon: '🗿', label: 'Скульптуры' },
    { icon: '📜', label: 'Экспонаты' },
    { icon: '🎧', label: 'Аудиогид' },
    { icon: '👨‍🏫', label: 'Экскурсии' },
    { icon: '🏺', label: 'Артефакты' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50/30 pb-20">
      {/* Шапка с градиентом */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-strong">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
              🏛️
            </div>
            <div>
              <h1 className="text-3xl font-bold">Музеи Донецка</h1>
              <p className="opacity-90">Погрузитесь в историю и культуру</p>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative max-w-2xl">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Поиск музеев, галерей, выставок..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70"
            />
          </div>
        </div>
      </header>

      {/* Особенности музеев */}
      <section className="container py-6">
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Что можно увидеть в музеях</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {museumFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-lg mx-auto mb-2 group-hover:scale-110 transition-transform">
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
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-white text-amber-600 shadow-medium'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-soft'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Сетка музеев */}
      <section className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {museumLocations.map((location, index) => (
            <div 
              key={location.id}
              className="bg-white rounded-3xl shadow-soft overflow-hidden hover-lift group border border-amber-100"
            >
              {/* Верхняя часть с градиентом */}
              <div className={`h-32 relative overflow-hidden ${
                index % 3 === 0 ? 'gradient-sunshine' : 
                index % 3 === 1 ? 'gradient-sunset' : 'gradient-lavender'
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
                <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-amber-600 transition-colors">
                  {location.name}
                </h3>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                  {location.description}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    {location.type || 'Музей'}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    📍 {location.distance || '1.5 км'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>💬</span>
                    <span>{location.reviews} отзывов</span>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-medium hover:shadow-soft transition-all">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Сообщение если нет результатов */}
        {museumLocations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Пока нет музеев</h3>
            <p className="text-gray-500">Скоро здесь появятся лучшие музеи Донецка</p>
          </div>
        )}
      </section>

      <BottomNavigation />
    </div>
  )
}
