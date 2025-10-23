// components/BottomNavigation.js
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNavigation() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState('map')

  const navItems = [
    { id: 'map', icon: '🗺️', label: 'Карта', href: '/map' },
    { id: 'catalog', icon: '🏛️', label: 'Каталог', href: '/locations' },
    { id: 'favorites', icon: '⭐', label: 'Избранное', href: '/favorites' },
    { id: 'routes', icon: '🧭', label: 'Маршруты', href: '/routes' },
    { id: 'profile', icon: '👤', label: 'Профиль', href: '/profile' }
  ]

  return (
    <nav className="mobile-nav glass-effect shadow-glow fixed bottom-0 left-0 right-0 z-50">
      <div className="container">
        <div className="flex justify-around py-3">
          {navItems.map(item => (
            <Link 
              key={item.id}
              href={item.href}
              className={`mobile-nav-item flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                pathname === item.href 
                  ? 'active text-blue-600 bg-white shadow-soft' 
                  : 'text-slate-600 hover:bg-white/50'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className={`nav-icon text-lg ${pathname === item.href ? 'active scale-110' : ''}`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}