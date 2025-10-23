'use client'
import { useState } from 'react'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Парк Ленинского комсомола",
      category: "park",
      address: "ул. Артема, Донецк",
      rating: 4.5
    },
    {
      id: 2, 
      name: "Ресторан 'У Федора'",
      category: "cafe",
      address: "пр. Мира, 15, Донецк",
      rating: 4.8
    }
  ])

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container py-4">
          <h1 className="text-xl font-semibold">⭐ Избранное</h1>
        </div>
      </header>

      <div className="container py-6">
        {favorites.length > 0 ? (
          <div className="grid gap-4">
            {favorites.map(favorite => (
              <div key={favorite.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{favorite.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{favorite.address}</p>
                    <div className="flex items-center gap-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {favorite.category === 'park' && 'Парк'}
                        {favorite.category === 'cafe' && 'Кафе'}
                        {favorite.category === 'hotel' && 'Отель'}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        ⭐ {favorite.rating}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeFavorite(favorite.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm">
                    Построить маршрут
                  </button>
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg text-sm">
                    Поделиться
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">⭐</div>
            <h3 className="text-xl font-semibold mb-2">Нет избранных мест</h3>
            <p className="text-gray-600 mb-4">Добавляйте места в избранное, чтобы вернуться к ним позже</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Найти интересные места
            </button>
          </div>
        )}
      </div>
    </div>
  )
}