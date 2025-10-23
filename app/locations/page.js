'use client'
import { useState } from 'react'
import Link from 'next/link'
import { locations, categories } from '../../lib/data'

export default async function LocationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  let req_obj = await fetch("http://localhost:3000/objects.json")
  let db_obj = await req_obj.json()
  let req_types = await fetch("http://localhost:3000/object_types.json")
  let db_types = await req_types.json()

  const filteredLocations = locations
    .filter(location => {
      const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory
      const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           location.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'reviews') return b.reviews - a.reviews
      return a.name.localeCompare(b.name)
    })

  const getCategoryIcon = (category) => {
    const icons = {
      park: '🏞️',
      cafe: '🍽️', 
      hotel: '🏨',
      museum: '🏛️',
      monument: '🗿'
    }
    return icons[category] || '📍'
  }

  const getCategoryColor = (category) => {
    const colors = {
      park: 'from-green-500 to-emerald-600',
      cafe: 'from-orange-500 to-red-500',
      hotel: 'from-blue-500 to-cyan-500',
      museum: 'from-purple-500 to-pink-500',
      monument: 'from-yellow-500 to-amber-600'
    }
    return colors[category] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Хедер */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/30">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🏛️ Все локации
              </h1>
              <p className="text-gray-600 text-sm">Полный список достопримечательностей ДНР</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{filteredLocations.length}</div>
              <div className="text-sm text-gray-600">найдено мест</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Сайдбар с фильтрами */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-white/30 sticky top-6">
              {/* Поиск */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Название или описание..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Сортировка */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Сортировка</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">По рейтингу</option>
                  <option value="reviews">По количеству отзывов</option>
                  <option value="name">По названию</option>
                </select>
              </div>

              {/* Категории */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Категории</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
                        selectedCategory === category.id 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-soft' 
                          : 'bg-gray-50/80 hover:bg-white text-gray-700 hover:shadow-soft'
                      }`}
                    >
                      <span className="text-xl">{getCategoryIcon(category.id)}</span>
                      <span className="font-medium flex-1">{category.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {locations.filter(l => l.category === category.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Быстрые действия */}
              <div className="mt-6 space-y-3">
                <Link 
                  href="/map"
                  className="w-full p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-soft transition-shadow flex items-center justify-center gap-2"
                >
                  🗺️ На карте
                </Link>
                <Link 
                  href="/favorites"
                  className="w-full p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-soft transition-shadow flex items-center justify-center gap-2"
                >
                  ⭐ Избранное
                </Link>
              </div>
            </div>
          </div>

          {/* Список локаций */}
          <div className="lg:col-span-3">
            {filteredLocations.length > 0 ? (
              <div className="grid gap-4">
                {db_obj.map((item) => (
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.discription}</p>
                    <p>Раздел: {db_types[item.type]}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-12 text-center border border-white/30">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Локации не найдены</h3>
                <p className="text-gray-600 mb-6">Попробуйте изменить параметры поиска или выбрать другую категорию</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all') }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-soft transition-shadow"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}

            {/* Пагинация */}
            {filteredLocations.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button className="w-10 h-10 bg-white/80 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
                  ←
                </button>
                <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium">
                  1
                </button>
                <button className="w-10 h-10 bg-white/80 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="w-10 h-10 bg-white/80 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
                  3
                </button>
                <button className="w-10 h-10 bg-white/80 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Навигация */}
      <nav className="bg-white/80 backdrop-blur-sm border-t border-white/30 mt-8">
        <div className="container">
          <div className="flex justify-around py-4">
            {[
              { href: '/', icon: '🏠', label: 'Главная' },
              { href: '/map', icon: '🗺️', label: 'Карта' },
              { href: '/locations', icon: '🏛️', label: 'Локации', active: true },
              { href: '/favorites', icon: '⭐', label: 'Избранное' },
              { href: '/reviews', icon: '💬', label: 'Отзывы' }
            ].map(item => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors group ${
                  item.active 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-soft' 
                    : 'hover:bg-white/50 text-gray-700'
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}