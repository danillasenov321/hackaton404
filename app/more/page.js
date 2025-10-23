'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function MorePage() {
  const [activeTab, setActiveTab] = useState('more')
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const menuSections = [
    {
      title: "Аккаунт",
      items: [
        {
          icon: '👤',
          title: 'Профиль',
          description: 'Управление вашим профилем',
          href: '/profile',
          color: 'from-blue-500 to-cyan-500',
          badge: null
        },
        {
          icon: '⭐',
          title: 'Избранное', 
          description: 'Сохраненные места',
          href: '/favorites',
          color: 'from-yellow-500 to-orange-500',
          badge: '5'
        },
        {
          icon: '💬',
          title: 'Мои отзывы',
          description: 'История ваших отзывов',
          href: '/reviews', 
          color: 'from-green-500 to-emerald-500',
          badge: '8'
        }
      ]
    },
    {
      title: "Навигация",
      items: [
        {
          icon: '🏛️',
          title: 'Все локации',
          description: 'Полный каталог мест',
          href: '/locations',
          color: 'from-purple-500 to-pink-500',
          badge: '50+'
        },
        {
          icon: '🧭',
          title: 'Маршруты',
          description: 'Построение путей',
          href: '/routes',
          color: 'from-indigo-500 to-blue-500',
          badge: 'Новое'
        },
        {
          icon: '🗺️',
          title: 'Оффлайн карты',
          description: 'Карты без интернета',
          href: '/offline-maps',
          color: 'from-teal-500 to-green-500',
          badge: null
        }
      ]
    },
    {
      title: "Приложение",
      items: [
        {
          icon: '⚙️',
          title: 'Настройки',
          description: 'Настройки приложения',
          href: '/settings',
          color: 'from-gray-500 to-slate-600',
          badge: null
        },
        {
          icon: '🔔',
          title: 'Уведомления',
          description: 'Управление уведомлениями',
          href: '#',
          color: 'from-red-500 to-pink-500',
          badge: null,
          toggle: true,
          value: notifications,
          onChange: setNotifications
        },
        {
          icon: '🌙',
          title: 'Темная тема',
          description: 'Переключение темы',
          href: '#',
          color: 'from-violet-500 to-purple-500',
          badge: null,
          toggle: true,
          value: darkMode,
          onChange: setDarkMode
        }
      ]
    },
    {
      title: "Помощь",
      items: [
        {
          icon: '📞',
          title: 'Поддержка',
          description: 'Свяжитесь с нами',
          href: '/support',
          color: 'from-rose-500 to-red-500',
          badge: null
        },
        {
          icon: '❓',
          title: 'Частые вопросы',
          description: 'Ответы на вопросы',
          href: '/faq',
          color: 'from-amber-500 to-yellow-500',
          badge: null
        },
        {
          icon: '📱',
          title: 'О приложении',
          description: 'Версия и информация',
          href: '/about',
          color: 'from-sky-500 to-blue-500',
          badge: null
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-20">
      {/* Шапка с градиентом */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-strong">
        <div className="container py-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl shadow-lg animate-pulse-slow">
              ⋯
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Дополнительно</h1>
              <p className="text-xl opacity-90">Все функции в одном месте</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Секции меню */}
        {menuSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              {section.title}
            </h2>
            
            <div className="grid gap-4">
              {section.items.map((item, index) => (
                <div key={item.title} className="group relative">
                  {item.href ? (
                    <Link href={item.href}>
                      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 border border-white/50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                              {item.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {item.badge && (
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                {item.badge}
                              </span>
                            )}
                            <div className="text-gray-400 text-xl group-hover:text-purple-600 group-hover:translate-x-2 transition-all duration-300">
                              →
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 border border-white/50 hover:border-purple-200 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.value}
                              onChange={(e) => item.onChange(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Статистика приложения */}
        <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg animate-float">
              🗺️
            </div>
            <h3 className="font-bold text-gray-800 text-2xl mb-2">Гид по ДНР</h3>
            <p className="text-gray-600">Версия 1.0.0</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600 text-sm">мест</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">1k+</div>
              <div className="text-gray-600 text-sm">отзывов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">99%</div>
              <div className="text-gray-600 text-sm">довольных</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2024 Команда хакатона. Все права защищены.
            </p>
          </div>
        </div>
      </main>

      {/* Мобильная навигация */}
      <nav className="fixed bottom-4 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center py-3 px-6">
          {[
            { id: 'home', icon: '🏠', label: 'Главная', href: '/' },
            { id: 'map', icon: '🗺️', label: 'Карта', href: '/map' },
            { id: 'locations', icon: '🏛️', label: 'Локации', href: '/locations' },
            { id: 'more', icon: '⋯', label: 'Ещё', href: '/more' }
          ].map(item => (
            <Link 
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'text-purple-600 bg-purple-50 scale-110' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className={`text-2xl transition-transform duration-300 ${
                activeTab === item.id ? 'scale-110' : ''
              }`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}