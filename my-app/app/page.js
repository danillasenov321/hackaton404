// app/page.js
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('donetsk')
  const [activeTab, setActiveTab] = useState('home')

  const categories = [
    { id: 'donetsk', name: 'Донецк', icon: '🏙️', description: 'Достопримечательности', href: '/donetsk' },
    { id: 'hotels', name: 'Отели', icon: '🏨', description: 'Гостиницы и проживание', href: '/hotels' },
    { id: 'parks', name: 'Парки', icon: '🏞️', description: 'Парки и зоны отдыха', href: '/parks' },
    { id: 'cafes', name: 'Кафе', icon: '🍽️', description: 'Рестораны и кафе', href: '/cafes' },
    { id: 'museums', name: 'Музеи', icon: '🏛️', description: 'Музеи и галереи', href: '/museums' },
    { id: 'shopping', name: 'Шопинг', icon: '🛍️', description: 'Магазины и торговые центры', href: '/shopping' },
    { id: 'entertainment', name: 'Развлечения', icon: '🎭', description: 'Развлекательные заведения', href: '/entertainment' },
    { id: 'map', name: 'Карта', icon: '🗺️', description: 'Интерактивная карта', href: '/map' }
  ]

  const popularPlaces = [
    {
      name: "Парк Ленинского комсомола",
      type: "Парк отдыха",
      rating: 4.5,
      reviews: 124,
      image: "🌳",
      gradient: "gradient-forest",
      badges: ["🌿 Природа", "🚶 Прогулки"]
    },
    {
      name: "Ресторан 'У Федора'",
      type: "Русская кухня", 
      rating: 4.7,
      reviews: 156,
      image: "🍽️",
      gradient: "gradient-sunset",
      badges: ["🍛 Еда", "💫 Премиум"]
    },
    {
      name: "Донецкий ботанический сад",
      type: "Природный заповедник",
      rating: 4.8, 
      reviews: 89,
      image: "🌿",
      gradient: "gradient-mint",
      badges: ["🌸 Цветы", "📚 Образование"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Шапка сайта */}
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            {/* Логотип и название */}
            <Link href="/" className="logo">
              <div className="logo-icon">
                🗺️
              </div>
              <span>ГидДНР</span>
            </Link>

            {/* Поисковая строка */}
            <div className="search-container">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Поиск достопримечательностей, отелей, ресторанов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Навигация в шапке */}
            <nav className="header-nav">
              <Link href="/reviews" className="nav-link">
                <span>💬 Отзывы</span>
              </Link>
              <Link href="/login" className="nav-link nav-link-primary">
                <span>👤 Войти в аккаунт</span>
              </Link>
            </nav>

          </div>
        </div>
      </header>

      {/* Категории под шапкой - ТЕПЕРЬ С ССЫЛКАМИ */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-container">
            {categories.map(category => (
              <Link
                key={category.id}
                href={category.href}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''} ${
                  category.id === 'map' ? 'category-map' : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Основной контент */}
      <main className="container py-8">
        {/* Приветственная секция */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold high-contrast-text mb-4">
            Добро пожаловать в <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Донецк</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Откройте для себя уникальные достопримечательности, лучшие отели и рестораны Донецкой Народной Республики
          </p>
        </section>

        {/* Популярные места */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold high-contrast-text">
              Популярные места
            </h2>
            <Link href="/locations" className="text-link flex items-center gap-2">
              <span>Все места</span>
              <span>→</span>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPlaces.map((place, index) => (
              <div 
                key={place.name}
                className="light-card rounded-3xl overflow-hidden hover-lift group glass-effect border border-slate-200/50"
              >
                <div className={`h-48 ${place.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center text-5xl text-white">
                    {place.image}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                    ⭐ {place.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold high-contrast-text text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">{place.type}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {place.badges.map((badge, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                        {badge}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">
                      {place.reviews} отзывов
                    </span>
                    <Link href="/locations" className="px-4 py-2 gradient-primary text-white rounded-xl text-sm font-medium hover:shadow-soft transition-shadow">
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Дополнительные секции */}
        <section className="grid md:grid-cols-3 gap-6">
          <Link href="/map" className="light-card rounded-3xl p-6 text-center hover-lift glass-effect card-link">
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="font-semibold high-contrast-text mb-2">Интерактивная карта</h3>
            <p className="text-slate-600 text-sm">Исследуйте город на интерактивной карте</p>
          </Link>
          
          <Link href="/reviews" className="light-card rounded-3xl p-6 text-center hover-lift glass-effect card-link">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="font-semibold high-contrast-text mb-2">Лучшие отзывы</h3>
            <p className="text-slate-600 text-sm">Читайте отзывы реальных посетителей</p>
          </Link>
          
          <div className="light-card rounded-3xl p-6 text-center hover-lift glass-effect">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold high-contrast-text mb-2">Быстрый поиск</h3>
            <p className="text-slate-600 text-sm">Найдите нужное место за секунды</p>
          </div>
        </section>
      </main>

      {/* Мобильная навигация */}
      <nav className="mobile-nav glass-effect shadow-glow fixed bottom-0 left-0 right-0 md:hidden">
        <div className="container">
          <div className="flex justify-around py-3">
            {[
              { id: 'home', icon: '🏠', label: 'Главная', href: '/' },
              { id: 'map', icon: '🗺️', label: 'Карта', href: '/map' },
              { id: 'locations', icon: '🏛️', label: 'Локации', href: '/locations' },
              { id: 'more', icon: '⋯', label: 'Ещё', href: '/more' }
            ].map(item => (
              <Link 
                key={item.id}
                href={item.href}
                className={`mobile-nav-item flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
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