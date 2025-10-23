'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('donetsk')
  const [activeTab, setActiveTab] = useState('home')
  const [currentSlide, setCurrentSlide] = useState(0)

  const galleryImages = [
  {
    id: 1,
    title: "Площадь Ленина",
    description: "Центральная площадь города с архитектурными ансамблями",
    color: "from-blue-600 to-purple-700",
    image: "/images/gallery/ploshad-lenina.jpg" // ← добавьте это
  },
  {
    id: 2,
    title: "Парк кованых фигур", 
    description: "Уникальные художественные произведения из металла",
    color: "from-emerald-600 to-green-700",
    image: "/images/gallery/park-kovanyh-figur.jpg"
  },
  {
    id: 3,
    title: "Свято-Преображенский собор",
    description: "Архитектурная жемчужина Донецка 19 века", 
    color: "from-amber-600 to-orange-700",
    image: "/images/gallery/sobor.jpg"
  },
  {
    id: 4,
    title: "Донецкий драмтеатр",
    description: "Центр культурной жизни города с богатой историей",
    color: "from-rose-600 to-pink-700",
    image: "/images/gallery/dramteatr.jpg"
  }
]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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

  const activities = [
    {
      icon: "🏛️",
      title: "Посетить музеи",
      description: "Погрузитесь в историю и культуру региона",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🌿",
      title: "Прогуляться в парках",
      description: "Отдохните в живописных зеленых зонах",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: "🍽️",
      title: "Попробовать местную кухню",
      description: "Откройте для себя вкусы Донбасса",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "🎨",
      title: "Искусство и культура",
      description: "Театры, галереи и выставки",
      color: "from-blue-500 to-cyan-500"
    }
  ]

  const recommendedPlaces = [
    {
      name: "Донецкий ботанический сад",
      type: "Природный заповедник",
      rating: 4.8,
      reviews: 89,
      image: "🌿",
      gradient: "gradient-mint",
      badges: ["🌸 Цветы", "📚 Образование"],
      distance: "3.2 км"
    },
    {
      name: "Парк Ленинского комсомола",
      type: "Парк отдыха",
      rating: 4.5,
      reviews: 124,
      image: "🌳",
      gradient: "gradient-forest",
      badges: ["🌿 Природа", "🚶 Прогулки"],
      distance: "1.8 км"
    },
    {
      name: "Ресторан 'У Федора'",
      type: "Русская кухня", 
      rating: 4.7,
      reviews: 156,
      image: "🍽️",
      gradient: "gradient-sunset",
      badges: ["🍛 Еда", "💫 Премиум"],
      distance: "2.5 км"
    },
    {
      name: "Донецкий краеведческий музей",
      type: "Музей",
      rating: 4.6,
      reviews: 203,
      image: "🏛️",
      gradient: "gradient-lavender",
      badges: ["📚 История", "🏛️ Культура"],
      distance: "1.2 км"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Шапка сайта */}
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">
              <div className="logo-icon">🗺️</div>
              <span>ГидДНР</span>
            </Link>

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

      {/* Категории под шапкой */}
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

      <main className="container py-8">
        {/* Галерея с достопримечательностями */}
<section className="mb-16">
  <div 
    className="relative rounded-3xl overflow-hidden shadow-strong h-96"
    onWheel={(e) => {
      if (e.deltaY > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }}
  >
    {/* Текущее изображение */}
    <div className="w-full h-full relative">
      <div className={`w-full h-full bg-gradient-to-br ${galleryImages[currentSlide].color}`}>
        
        {/* Реальная картинка */}
        <img 
          src={galleryImages[currentSlide].image} 
          alt={galleryImages[currentSlide].title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        {/* Заглушка на случай ошибки */}
        <div 
          className="w-full h-full flex items-center justify-center bg-gray-200"
          style={{ display: 'none' }}
        >
          <div className="text-center text-gray-600">
            <div className="text-4xl mb-2">🖼️</div>
            <div className="text-lg font-semibold">{galleryImages[currentSlide].title}</div>
            <div className="text-sm text-gray-500 mt-1">(изображение не загружено)</div>
          </div>
        </div>
      </div>
      
      {/* Текст поверх картинки */}
      <div className="absolute inset-0 bg-black/30 flex items-end">
        <div className="text-white z-10 p-6 w-full bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{galleryImages[currentSlide].title}</h2>
          <p className="text-lg opacity-90">{galleryImages[currentSlide].description}</p>
        </div>
      </div>
    </div>

    {/* Кружочки-индикаторы */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
      {galleryImages.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-4 h-4 rounded-full transition-all duration-300 ${
            index === currentSlide 
              ? 'bg-white scale-125 shadow-lg' 
              : 'bg-white/50 hover:bg-white/70 hover:scale-110'
          }`}
        />
      ))}
    </div>

    {/* Счетчик слайдов */}
    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
      {currentSlide + 1} / {galleryImages.length}
    </div>
  </div>

  {/* Подпись под галереей */}
  <div className="text-center mt-4">
    <p className="text-gray-600 text-sm">
      🔄 Прокрутите колесиком мыши для переключения слайдов
    </p>
  </div>
</section>

        {/* Приветственная секция */}
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-strong">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Добро пожаловать в <span className="text-yellow-300">Донецк</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Откройте для себя уникальные достопримечательности, богатую историю и 
              гостеприимство жемчужины Донбасса
            </p>
          </div>
        </section>

        {/* Чем заняться в Донецке */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 high-contrast-text">
            🌟 Чем заняться в Донецке
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <div 
                key={index}
                className="light-card rounded-3xl p-6 text-center hover-lift group border-2 border-transparent hover:border-blue-200 transition-all duration-300"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${activity.color} flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {activity.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 high-contrast-text group-hover:text-blue-600 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Донецк: самое интересное */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-strong">
            <h2 className="text-4xl font-bold mb-6 text-center">
              🎯 Донецк: самое интересное
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl mb-3">🏛️</div>
                <h3 className="font-bold text-xl mb-2">Богатая история</h3>
                <p className="opacity-90">От шахтерского прошлого к культурному настоящему</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="font-bold text-xl mb-2">Уникальная природа</h3>
                <p className="opacity-90">Парки, скверы и ботанический сад</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl mb-3">🍽️</div>
                <h3 className="font-bold text-xl mb-2">Вкусная кухня</h3>
                <p className="opacity-90">Традиционные блюда и современные рестораны</p>
              </div>
            </div>
          </div>
        </section>

        {/* Рекомендованные места */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold high-contrast-text">
              💫 Рекомендованные места
            </h2>
            <Link href="/locations" className="text-link flex items-center gap-2 text-lg">
              <span>Все места</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedPlaces.map((place, index) => (
              <div 
                key={place.name}
                className="light-card rounded-3xl overflow-hidden hover-lift group glass-effect border border-slate-200/50"
              >
                <div className={`h-32 ${place.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl text-white">
                    {place.image}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs font-medium">
                    ⭐ {place.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs">
                    📍 {place.distance}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold high-contrast-text text-base mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {place.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">{place.type}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {place.badges.map((badge, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                        {badge}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs">
                      {place.reviews} отзывов
                    </span>
                    <Link href="/locations" className="px-3 py-1 gradient-primary text-white rounded-xl text-xs font-medium hover:shadow-soft transition-shadow">
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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