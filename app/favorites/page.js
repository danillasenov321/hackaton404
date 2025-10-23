'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Парк Ленинского комсомола",
      category: "park",
      address: "ул. Артема, Донецк",
      rating: 4.5,
      image: "🌳",
      distance: "1.2 км",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 2, 
      name: "Ресторан 'У Федора'",
      category: "cafe",
      address: "пр. Мира, 15, Донецк",
      rating: 4.8,
      image: "🍽️",
      distance: "2.3 км",
      color: "from-orange-500 to-amber-500"
    }
  ])

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50/30 to-orange-50/30 pb-20">
      {/* Шапка с градиентом */}
      <header className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 text-white shadow-strong">
        <div className="container py-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl shadow-lg animate-pulse-slow">
              ⭐
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Избранное</h1>
              <p className="text-xl opacity-90">Ваши сохраненные места</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {favorites.length > 0 ? (
          <div className="grid gap-6">
            {favorites.map((favorite, index) => (
              <div 
                key={favorite.id}
                className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-strong overflow-hidden hover-lift group border border-white/20 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Изображение */}
                  <div className={`md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-gradient-to-r ${favorite.color}`}>
                    <div className="absolute inset-0 flex items-center justify-center text-6xl text-white animate-float">
                      {favorite.image}
                    </div>
                    
                    {/* Бейджи */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg rounded-full px-4 py-2 text-white font-semibold text-sm shadow-lg">
                      ⭐ {favorite.rating}
                    </div>
                    <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-lg rounded-full px-3 py-1 text-white text-xs font-medium">
                      {favorite.category === 'park' && '🌳 Парк'}
                      {favorite.category === 'cafe' && '🍽️ Ресторан'}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-lg rounded-full px-3 py-1 text-white text-xs">
                      📍 {favorite.distance}
                    </div>
                  </div>
                  
                  {/* Контент */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-2xl mb-2 text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                          {favorite.name}
                        </h3>
                        <p className="text-gray-600 mb-3">{favorite.address}</p>
                      </div>
                      
                      <button 
                        onClick={() => removeFavorite(favorite.id)}
                        className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 hover:scale-110 transition-all duration-300 ml-4"
                      >
                        ❌
                      </button>
                    </div>
                    
                    {/* Детали */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                          ⭐
                        </div>
                        <div>
                          <div className="font-semibold">{favorite.rating}</div>
                          <div className="text-sm text-gray-500">Рейтинг</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                          📍
                        </div>
                        <div>
                          <div className="font-semibold">{favorite.distance}</div>
                          <div className="text-sm text-gray-500">Расстояние</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Кнопки действий */}
                    <div className="flex gap-4">
                      <button className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group">
                        <span>Построить маршрут</span>
                        <span className="group-hover:translate-x-1 transition-transform">🧭</span>
                      </button>
                      <button className="px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:border-blue-300 hover:text-blue-600 hover:scale-105 transition-all duration-300">
                        📤
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 animate-bounce">⭐</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Нет избранных мест</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Добавляйте места в избранное, чтобы быстро возвращаться к ним позже
            </p>
            <Link 
              href="/locations"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>🔍 Найти интересные места</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}