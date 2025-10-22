'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function MorePage() {
  const [activeTab, setActiveTab] = useState('more')

  const menuItems = [
    {
      icon: '🏛️',
      title: 'Все локации',
      description: 'Полный список достопримечательностей',
      href: '/locations',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '⭐',
      title: 'Избранное', 
      description: 'Сохраненные места',
      href: '/favorites',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '💬',
      title: 'Отзывы',
      description: 'Читайте и оставляйте отзывы',
      href: '/reviews', 
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🧭',
      title: 'Маршруты',
      description: 'Построение путей до локаций',
      href: '/route',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⚙️',
      title: 'Настройки',
      description: 'Настройки приложения',
      href: '/settings',
      color: 'from-gray-500 to-slate-600'
    },
    {
      icon: '📞',
      title: 'Поддержка',
      description: 'Свяжитесь с нами',
      href: '/support',
      color: 'from-red-500 to-pink-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Хедер */}
      <header className="app-header">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white">
                ⋯
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Ещё</h1>
                <p className="text-slate-400 text-sm">Дополнительные функции</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6">
        {/* Меню */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="dark-card rounded-2xl p-4 hover:shadow-medium transition-shadow block"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white text-lg`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
                <div className="text-slate-400">→</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Информация о приложении */}
        <div className="dark-card rounded-2xl p-6 mt-8 text-center">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
            🗺️
          </div>
          <h3 className="font-semibold text-white mb-2">Гид по ДНР</h3>
          <p className="text-slate-400 text-sm mb-4">Версия 1.0.0</p>
          <p className="text-slate-400 text-xs">
            © 2024 Команда хакатона. Все права защищены.
          </p>
        </div>
      </main>

      {/* Мобильная навигация */}
      <nav className="mobile-nav fixed bottom-0 left-0 right-0">
        <div className="container">
          <div className="flex justify-around py-3">
            {[
              { id: 'home', icon: '🏠', label: 'Главная', href: '/' },
              { id: 'map', icon: '🗺️', label: 'Карта', href: '/map' },
              { id: 'profile', icon: '👤', label: 'Профиль', href: '/profile' },
              { id: 'more', icon: '⋯', label: 'Ещё', href: '/more', active: true }
            ].map(item => (
              <Link 
                key={item.id}
                href={item.href}
                className={`mobile-nav-item flex flex-col items-center gap-1 p-2 rounded-xl ${
                  activeTab === item.id ? 'active text-blue-400' : 'text-slate-400'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className={`nav-icon ${activeTab === item.id ? 'active' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}