'use client'
import { useState } from 'react'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      locationName: "Парк Ленинского комсомола",
      userName: "Анна Иванова",
      rating: 5,
      text: "Прекрасный парк для семейного отдыха! Чисто, ухоженно, красиво.",
      date: "2024-10-15"
    },
    {
      id: 2,
      locationName: "Ресторан 'У Федора'", 
      userName: "Петр Сидоров",
      rating: 4,
      text: "Вкусная еда и приятная атмосфера. Обслуживание на уровне.",
      date: "2024-10-12"
    }
  ])

  const [newReview, setNewReview] = useState({
    locationName: '',
    userName: '',
    rating: 5,
    text: ''
  })

  const addReview = () => {
    if (newReview.locationName && newReview.userName && newReview.text) {
      setReviews([
        {
          id: Date.now(),
          ...newReview,
          date: new Date().toISOString().split('T')[0]
        },
        ...reviews
      ])
      setNewReview({ locationName: '', userName: '', rating: 5, text: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container py-4">
          <h1 className="text-xl font-semibold">💬 Отзывы</h1>
        </div>
      </header>

      <div className="container py-6">
        {/* Форма добавления отзыва */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Добавить отзыв</h2>
          
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Название места"
              value={newReview.locationName}
              onChange={(e) => setNewReview({...newReview, locationName: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="text"
              placeholder="Ваше имя"
              value={newReview.userName}
              onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div>
              <label className="block mb-2 text-sm">Оценка:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setNewReview({...newReview, rating: star})}
                    className={`text-2xl ${
                      star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
            
            <textarea
              placeholder="Ваш отзыв..."
              value={newReview.text}
              onChange={(e) => setNewReview({...newReview, text: e.target.value})}
              rows="4"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <button
              onClick={addReview}
              className="py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Опубликовать отзыв
            </button>
          </div>
        </div>

        {/* Список отзывов */}
        <div className="grid gap-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{review.locationName}</h3>
                  <p className="text-gray-600 text-sm">Автор: {review.userName}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span>{review.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3">{review.text}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>📅 {review.date}</span>
                <div className="flex gap-2">
                  <button className="text-blue-600">Полезно</button>
                  <button className="text-gray-400">Ответить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}