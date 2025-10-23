'use client'
import { useState } from 'react'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      locationName: "Парк Ленинского комсомола",
      userName: "Анна Иванова",
      rating: 5,
      text: "Прекрасный парк для семейного отдыха! Чисто, ухоженно, красиво. Дети в восторге от детских площадок.",
      date: "2024-10-15",
      likes: 12,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 2,
      locationName: "Ресторан 'У Федора'", 
      userName: "Петр Сидоров",
      rating: 4,
      text: "Вкусная еда и приятная атмосфера. Обслуживание на уровне. Рекомендую попробовать фирменные блюда.",
      date: "2024-10-12",
      likes: 8,
      color: "from-orange-500 to-amber-500"
    }
  ])

  const [newReview, setNewReview] = useState({
    locationName: '',
    userName: '',
    rating: 5,
    text: ''
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const addReview = () => {
    if (newReview.locationName && newReview.userName && newReview.text) {
      setReviews([
        {
          id: Date.now(),
          ...newReview,
          date: new Date().toISOString().split('T')[0],
          likes: 0,
          color: "from-blue-500 to-cyan-500"
        },
        ...reviews
      ])
      setNewReview({ locationName: '', userName: '', rating: 5, text: '' })
      setIsExpanded(false)
    }
  }

  const likeReview = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, likes: review.likes + 1 } : review
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/30 pb-20">
      {/* Шапка с градиентом */}
      <header className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white shadow-strong">
        <div className="container py-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl shadow-lg animate-pulse-slow">
              💬
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Отзывы</h1>
              <p className="text-xl opacity-90">Мнения и рекомендации</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Форма добавления отзыва */}
        <div className={`bg-white/90 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20 shadow-strong transition-all duration-500 ${isExpanded ? 'scale-105' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Добавить отзыв</h2>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center hover:scale-110 transition-all duration-300 ${isExpanded ? 'rotate-45' : ''}`}
            >
              {isExpanded ? '−' : '+'}
            </button>
          </div>
          
          {isExpanded && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Название места
                  </label>
                  <input
                    type="text"
                    placeholder="Например: Парк Ленинского комсомола"
                    value={newReview.locationName}
                    onChange={(e) => setNewReview({...newReview, locationName: e.target.value})}
                    className="w-full p-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={newReview.userName}
                    onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                    className="w-full p-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Оценка
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className={`text-3xl transition-all duration-300 hover:scale-110 ${
                        star <= newReview.rating ? 'text-yellow-500 animate-bounce' : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Ваш отзыв
                </label>
                <textarea
                  placeholder="Поделитесь своими впечатлениями..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  rows="4"
                  className="w-full p-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                />
              </div>
              
              <button
                onClick={addReview}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>📝</span>
                <span>Опубликовать отзыв</span>
              </button>
            </div>
          )}
        </div>

        {/* Список отзывов */}
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-strong hover-lift transition-all duration-500 group">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="font-bold text-2xl text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all duration-300">
                    {review.locationName}
                  </h3>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-600 font-semibold">Автор: {review.userName}</p>
                    <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                      <span className="text-yellow-600">⭐</span>
                      <span className="font-semibold text-yellow-700">{review.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{review.text}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-6 text-gray-500">
                  <span className="flex items-center gap-2">
                    📅 {review.date}
                  </span>
                  <button 
                    onClick={() => likeReview(review.id)}
                    className="flex items-center gap-2 hover:text-green-600 transition-colors duration-300"
                  >
                    👍 {review.likes}
                  </button>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 hover:scale-105 transition-all duration-300">
                    Полезно
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300">
                    Ответить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}