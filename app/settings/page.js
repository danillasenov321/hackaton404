'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    locationServices: true,
    soundEffects: true,
    vibration: true,
    autoPlayVideos: false,
    dataSaving: true,
    language: 'ru',
    measurement: 'km',
    fontSize: 'medium'
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const settingGroups = [
    {
      title: "Уведомления",
      icon: "🔔",
      color: "from-red-500 to-pink-500",
      settings: [
        {
          key: 'notifications',
          label: 'Push-уведомления',
          description: 'Получать уведомления о новых местах',
          type: 'toggle'
        },
        {
          key: 'soundEffects',
          label: 'Звуковые эффекты',
          description: 'Звуки при взаимодействии',
          type: 'toggle'
        },
        {
          key: 'vibration',
          label: 'Вибрация',
          description: 'Вибрация при уведомлениях',
          type: 'toggle'
        }
      ]
    },
    {
      title: "Внешний вид",
      icon: "🎨",
      color: "from-purple-500 to-indigo-500",
      settings: [
        {
          key: 'darkMode',
          label: 'Темная тема',
          description: 'Переключение между темами',
          type: 'toggle'
        },
        {
          key: 'fontSize',
          label: 'Размер текста',
          description: 'Настройка размера шрифта',
          type: 'select',
          options: [
            { value: 'small', label: 'Маленький' },
            { value: 'medium', label: 'Средний' },
            { value: 'large', label: 'Большой' }
          ]
        }
      ]
    },
    {
      title: "Конфиденциальность",
      icon: "🔒",
      color: "from-green-500 to-emerald-500",
      settings: [
        {
          key: 'locationServices',
          label: 'Геолокация',
          description: 'Использование вашего местоположения',
          type: 'toggle'
        },
        {
          key: 'dataSaving',
          label: 'Экономия трафика',
          description: 'Сжатие изображений и данных',
          type: 'toggle'
        }
      ]
    },
    {
      title: "Основные",
      icon: "⚙️",
      color: "from-blue-500 to-cyan-500",
      settings: [
        {
          key: 'language',
          label: 'Язык',
          description: 'Язык интерфейса',
          type: 'select',
          options: [
            { value: 'ru', label: 'Русский' },
            { value: 'en', label: 'English' }
          ]
        },
        {
          key: 'measurement',
          label: 'Единицы измерения',
          description: 'Километры или мили',
          type: 'select',
          options: [
            { value: 'km', label: 'Километры' },
            { value: 'mi', label: 'Мили' }
          ]
        },
        {
          key: 'autoPlayVideos',
          label: 'Автовоспроизведение',
          description: 'Автозапуск видео в приложении',
          type: 'toggle'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-20">
      {/* Шапка с градиентом */}
      <header className="bg-gradient-to-r from-gray-600 via-slate-600 to-gray-700 text-white shadow-strong">
        <div className="container py-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl shadow-lg animate-pulse-slow">
              ⚙️
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Настройки</h1>
              <p className="text-xl opacity-90">Персонализируйте приложение</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Группы настроек */}
        {settingGroups.map((group, groupIndex) => (
          <div key={group.title} className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${group.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                {group.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{group.title}</h2>
                <p className="text-gray-600">Настройки {group.title.toLowerCase()}</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/50 shadow-soft overflow-hidden">
              {group.settings.map((setting, index) => (
                <div key={setting.key} className={`p-6 ${index !== group.settings.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">
                        {setting.label}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {setting.description}
                      </p>
                    </div>
                    
                    <div className="ml-4">
                      {setting.type === 'toggle' && (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[setting.key]}
                            onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                        </label>
                      )}
                      
                      {setting.type === 'select' && (
                        <select
                          value={settings[setting.key]}
                          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {setting.options.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Действия */}
        <div className="grid gap-4 mb-8">
          <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            💾 Сохранить настройки
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:border-red-300 hover:text-red-600 hover:scale-105 transition-all duration-300">
              🔄 Сбросить
            </button>
            <button className="py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:border-green-300 hover:text-green-600 hover:scale-105 transition-all duration-300">
              📤 Экспорт
            </button>
          </div>
        </div>

        {/* Информация */}
        <div className="bg-gradient-to-r from-gray-100 to-slate-100 rounded-3xl p-6 text-center">
          <div className="text-gray-600 text-sm">
            <p className="mb-2">💡 Для применения некоторых настроек может потребоваться перезагрузка приложения</p>
            <p>Версия приложения: 1.0.0</p>
          </div>
        </div>
      </main>
    </div>
  )
}
