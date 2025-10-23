'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')

  const stats = [
    { label: 'Посещено мест', value: '12', icon: '📍', color: 'from-blue-500 to-cyan-500' },
    { label: 'Оставлено отзывов', value: '8', icon: '💬', color: 'from-green-500 to-emerald-500' },
    { label: 'В избранном', value: '5', icon: '⭐', color: 'from-yellow-500 to-orange-500' }
  ]

  const recentActivity = [
    { action: 'Добавил в избранное', place: 'Парк Ленинского комсомола', time: '2 часа назад', icon: '⭐', color: 'bg-yellow-500/20 text-yellow-400' },
    { action: 'Оставил отзыв', place: 'Ресторан "У Федора"', time: '1 день назад', icon: '💬', color: 'bg-green-500/20 text-green-400' },
    { action: 'Построил маршрут', place: 'Донецкий ботанический сад', time: '3 дня назад', icon: '🧭', color: 'bg-blue-500/20 text-blue-400' }
  ]

  const quickActions = [
    { icon: '⭐', title: 'Моё избранное', description: 'Сохраненные места', href: '/favorites', color: 'from-yellow-500 to-orange-500' },
    { icon: '💬', title: 'Мои отзывы', description: 'Оставленные отзывы', href: '/reviews', color: 'from-green-500 to-emerald-500' },
    { icon: '🏛️', title: 'Все локации', description: 'Исследовать новые места', href: '/locations', color: 'from-blue-500 to-cyan-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 pb-20">
      {/* Шапка с градиентом */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-strong">
        <div className="container py-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl shadow-lg animate-pulse-slow">
              👤
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Профиль</h1>
              <p className="text-xl opacity-90">Ваш туристический опыт</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Информация пользователя */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center mb-8 border border-white/20 shadow-strong">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-lg animate-float">
            👤
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Алексей Петров</h2>
          <p className="text-gray-600 text-lg mb-6">Турист • Донецк</p>
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <span>✏️</span>
            <span>Редактировать профиль</span>
          </button>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 shadow-soft group hover:scale-105 transition-all duration-300">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                {stat.icon}
              </div>
              <div className="text-gray-800 font-bold text-2xl mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Быстрые действия */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Быстрые действия</h3>
          <div className="grid gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                        {action.title}
                      </h4>
                      <p className="text-gray-600">{action.description}</p>
                    </div>
                    <div className="text-gray-400 text-xl group-hover:text-purple-600 group-hover:translate-x-2 transition-all duration-300">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Недавняя активность */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Недавняя активность</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-soft group hover:scale-102 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${activity.color} flex items-center justify-center text-lg`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{activity.action}</div>
                    <div className="text-gray-600">{activity.place}</div>
                  </div>
                  <div className="text-gray-500 text-sm">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}