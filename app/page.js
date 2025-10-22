'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('home')

  const features = [
    {
      icon: '🗺️',
      title: 'Интерактивная карта',
      description: 'Исследуйте достопримечательности на красивой карте',
      gradient: 'gradient-ocean',
      href: '/map',
      emoji: '🌍'
    },
    {
      icon: '🏛️',
      title: 'Все локации', 
      description: 'Откройте для себя уникальные места ДНР',
      gradient: 'gradient-forest',
      href: '/locations',
      emoji: '📸'
    },
    {
      icon: '⭐',
      title: 'Избранное',
      description: 'Сохраняйте понравившиеся места',
      gradient: 'gradient-sunshine',
      href: '/favorites',
      emoji: '💫'
    },
    {
      icon: '💬',
      title: 'Отзывы',
      description: 'Делитесь впечатлениями с другими',
      gradient: 'gradient-lavender',
      href: '/reviews',
      emoji: '✨'
    }
  ]

  const popularPlaces = [
    {
      name: "Парк Ленинского комсомола",
      type: "Парк отдыха",
      rating: 4.5,
      reviews: 124,
      distance: "2.1 км",
      image: "🌳",
      gradient: "gradient-forest",
      badges: ["🌿 Природа", "🚶 Прогулки", "👪 Семейный"]
    },
    {
      name: "Ресторан 'У Федора'",
      type: "Русская кухня", 
      rating: 4.7,
      reviews: 156,
      distance: "1.8 км",
      image: "🍽️",
      gradient: "gradient-sunset",
      badges: ["🍛 Еда", "💫 Премиум", "❤️ Романтический"]
    },
    {
      name: "Донецкий ботанический сад",
      type: "Природный заповедник",
      rating: 4.8, 
      reviews: 89,
      distance: "3.2 км",
      image: "🌿",
      gradient: "gradient-mint",
      badges: ["🌸 Цветы", "📚 Образование", "🦋 Природа"]
    }
  ]

  const quickCategories = [
    { icon: '🏞️', label: 'Парки', href: '/locations?category=park', color: 'gradient-forest' },
    { icon: '🍽️', label: 'Кафе', href: '/locations?category=cafe', color: 'gradient-sunset' },
    { icon: '🏨', label: 'Отели', href: '/locations?category=hotel', color: 'gradient-ocean' },
    { icon: '🏛️', label: 'Музеи', href: '/locations?category=museum', color: 'gradient-lavender' },
    { icon: '🛍️', label: 'Шопинг', href: '/locations', color: 'gradient-sunshine' },
    { icon: '🎭', label: 'Развлечения', href: '/locations', color: 'gradient-mint' }
  ]

  const stats = [
    { number: '150+', label: 'Локаций', icon: '📍' },
    { number: '4.8', label: 'Средний рейтинг', icon: '⭐' },
    { number: '5k+', label: 'Отзывов', icon: '💬' },
    { number: '24/7', label: 'Поддержка', icon: '🛡️' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 decorative-dots">
      {/* Хедер с улучшенным дизайном */}
      <header className="app-header glass-effect shadow-glow">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="icon-wrapper gradient-primary shadow-float text-white text-xl">
                🗺️
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Гид по ДНР
                </h1>
                <p className="text-slate-600 text-sm flex items-center gap-1">
                  <span>✨</span> Откройте магию Донецкого края
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Онлайн
              </div>
              <button className="icon-wrapper bg-white shadow-soft text-slate-700 hover-lift">
                🔔
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Герой секция */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-2xl shadow-soft border border-slate-200 mb-6">
              <span className="text-yellow-500">⭐</span>
              <span className="text-sm font-medium text-slate-700">Лучший путеводитель 2024</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold high-contrast-text mb-4 leading-tight">
              Исследуйте <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">красоту</span> ДНР
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              От парков и музеев до ресторанов и отелей - всё в одном приложении
            </p>
          </div>
        </section>

        {/* Поиск с улучшенным дизайном */}
        <section className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <input
                type="text"
                placeholder="🔍 Найдите парки, музеи, рестораны..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-5 pl-14 bg-white/90 backdrop-blur-sm rounded-3xl shadow-float border border-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg placeholder-slate-500 high-contrast-text transition-all duration-300 group-hover:shadow-glow"
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl text-slate-400">
                🌟
              </div>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Статистика */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="light-card rounded-3xl p-6 text-center hover-lift glass-effect">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold high-contrast-text mb-1">{stat.number}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Быстрые категории */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold high-contrast-text mb-6 text-center">Быстрый доступ</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickCategories.map((category, index) => (
              <Link
                key={category.label}
                href={category.href}
                className="light-card rounded-3xl p-5 text-center hover-lift group glass-effect"
              >
                <div className={`icon-wrapper ${category.color} text-white text-lg mb-3 mx-auto group-hover:scale-110 transition-transform shadow-soft`}>
                  {category.icon}
                </div>
                <div className="font-semibold high-contrast-text text-sm">{category.label}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Основные функции */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold high-contrast-text">Основные возможности</h3>
            <div className="flex items-center gap-2 text-blue-600">
              <span>✨</span>
              <span className="text-sm font-medium">Все функции</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link 
                key={feature.title}
                href={feature.href}
                className="light-card rounded-3xl p-6 hover-lift group relative overflow-hidden glass-effect"
              >
                <div className={`absolute top-4 right-4 text-2xl opacity-20`}>
                  {feature.emoji}
                </div>
                <div className={`icon-wrapper ${feature.gradient} text-white text-xl mb-4 group-hover:scale-110 transition-transform shadow-soft`}>
                  {feature.icon}
                </div>
                <h4 className="font-bold high-contrast-text text-lg mb-2">{feature.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-medium">
                  <span>Исследовать</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Популярные места */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold high-contrast-text mb-2">Популярные места</h3>
              <p className="text-slate-600">Самые посещаемые достопримечательности</p>
            </div>
            <Link href="/locations" className="px-6 py-3 bg-white rounded-2xl shadow-soft border border-slate-200 hover-lift text-slate-700 font-medium flex items-center gap-2">
              <span>Все места</span>
              <span>→</span>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPlaces.map((place, index) => (
              <div 
                key={place.name}
                className="light-card rounded-3xl overflow-hidden hover-lift group glass-effect"
              >
                <div className={`h-32 ${place.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl text-white">
                    {place.image}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                    {place.distance}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold high-contrast-text text-lg mb-1 group-hover:text-blue-600 transition-colors">
                        {place.name}
                      </h4>
                      <p className="text-slate-600 text-sm">{place.type}</p>
                    </div>
                    <button className="text-slate-400 hover:text-yellow-500 transition-colors p-2">
                      ⭐
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                      <span className="text-amber-600">⭐</span>
                      <span className="font-semibold text-slate-800">{place.rating}</span>
                      <span className="text-slate-500 text-sm">({place.reviews})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {place.badges.map((badge, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                        {badge}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 gradient-primary text-white rounded-xl font-medium hover:shadow-soft transition-shadow text-sm">
                      Подробнее
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors text-sm">
                      🗺️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Мобильная навигация с улучшенным дизайном */}
      <nav className="mobile-nav glass-effect shadow-glow fixed bottom-0 left-0 right-0">
        <div className="container">
          <div className="flex justify-around py-4">
            {[
              { id: 'home', icon: '🏠', label: 'Главная', href: '/' },
              { id: 'map', icon: '🗺️', label: 'Карта', href: '/map' },
              { id: 'profile', icon: '👤', label: 'Профиль', href: '/profile' },
              { id: 'more', icon: '⋯', label: 'Ещё', href: '/more' }
            ].map(item => (
              <Link 
                key={item.id}
                href={item.href}
                className={`mobile-nav-item flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id 
                    ? 'active text-blue-600 bg-white shadow-soft' 
                    : 'text-slate-600 hover:bg-white/50'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className={`nav-icon text-lg ${activeTab === item.id ? 'active scale-110' : ''}`}>
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