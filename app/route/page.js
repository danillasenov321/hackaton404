'use client'
import { useState } from 'react'

export default function RoutePage() {
  const [startPoint, setStartPoint] = useState('')
  const [endPoint, setEndPoint] = useState('Парк Ленинского комсомола')
  const [routeInfo, setRouteInfo] = useState(null)

  const calculateRoute = () => {
    // Заглушка для демонстрации
    setRouteInfo({
      distance: '2.5 км',
      time: '15 мин',
      steps: [
        'Выйти на ул. Артема',
        'Повернуть направо на пр. Мира', 
        'Следовать прямо 1.2 км',
        'Парк будет слева'
      ]
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container py-4">
          <h1 className="text-xl font-semibold">🧭 Построение маршрута</h1>
        </div>
      </header>

      <div className="container py-6">
        {/* Форма построения маршрута */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="grid gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Откуда:</label>
              <input
                type="text"
                placeholder="Ваше местоположение..."
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Куда:</label>
              <select
                value={endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Парк Ленинского комсомола">Парк Ленинского комсомола</option>
                <option value="Ресторан 'У Федора'">Ресторан "У Федора"</option>
                <option value="Гостиница 'Донбасс Палас'">Гостиница "Донбасс Палас"</option>
              </select>
            </div>
            
            <button
              onClick={calculateRoute}
              className="py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Построить маршрут
            </button>
          </div>
        </div>

        {/* Информация о маршруте */}
        {routeInfo && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Маршрут готов!</h2>
            
            <div className="flex gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl">📏</div>
                <div className="font-semibold">{routeInfo.distance}</div>
                <div className="text-sm text-gray-600">Расстояние</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl">⏱️</div>
                <div className="font-semibold">{routeInfo.time}</div>
                <div className="text-sm text-gray-600">Время</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Шаги маршрута:</h3>
              <div className="space-y-2">
                {routeInfo.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mt-1">
                      {index + 1}
                    </div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold">
                Открыть в картах
              </button>
              <button className="flex-1 py-3 border border-gray-300 rounded-lg">
                Поделиться
              </button>
            </div>
          </div>
        )}

        {/* Карта маршрута */}
        {routeInfo && (
          <div className="bg-gray-200 rounded-2xl h-64 mt-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-gray-600">Карта маршрута</p>
              <p className="text-sm text-gray-500">(Интеграция с навигационными сервисами)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}