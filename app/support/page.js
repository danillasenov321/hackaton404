'use client'
import { useState } from 'react'

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const faqItems = [
    {
      question: "Как добавить место в избранное?",
      answer: "На странице места нажмите на значок звезды в правом верхнем углу карточки."
    },
    {
      question: "Работает ли приложение оффлайн?",
      answer: "Да, вы можете скачать оффлайн карты в настройках для использования без интернета."
    },
    {
      question: "Как оставить отзыв о месте?",
      answer: "Перейдите на страницу места и нажмите кнопку 'Оставить отзыв' внизу страницы."
    },
    {
      question: "Можно ли построить маршрут до места?",
      answer: "Да, на странице места есть кнопка 'Построить маршрут', которая откроет карту с проложенным путем."
    }
  ]

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      description: 'Напишите нам на почту',
      value: 'support@guide-dnr.ru',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📞',
      title: 'Телефон',
      description: 'Позвоните в поддержку',
      value: '+7 (XXX) XXX-XX-XX',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💬',
      title: 'Чат',
      description: 'Онлайн консультация',
      value: 'Доступен 24/7',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Обработка отправки формы
    alert('Сообщение отправлено! Мы ответим вам в течение 24 часов.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/30 to-teal-50/30 pb-20">
      {/* Шапка с градиентом */}
      <header className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white shadow-strong">
        <div className="container py-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl shadow-lg animate-pulse-slow">
              📞
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Поддержка</h1>
              <p className="text-xl opacity-90">Мы всегда готовы помочь</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Табы */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {[
            { id: 'contact', label: 'Связаться', icon: '📧' },
            { id: 'faq', label: 'Частые вопросы', icon: '❓' },
            { id: 'methods', label: 'Способы связи', icon: '💬' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-lg scale-105'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Контент табов */}
        {activeTab === 'contact' && (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-soft">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Напишите нам</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                    className="w-full p-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full p-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Тема сообщения *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Например: Проблема с картой"
                  className="w-full p-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Сообщение *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Опишите вашу проблему или вопрос..."
                  rows="6"
                  className="w-full p-4 bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>🚀</span>
                <span>Отправить сообщение</span>
              </button>
            </form>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 border border-white/50 shadow-soft">
                <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-3">
                  <span className="text-blue-500">❓</span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'methods' && (
          <div className="grid gap-6">
            {contactMethods.map((method, index) => (
              <div key={method.title} className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-soft text-center group hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  {method.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-xl mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <div className="text-blue-600 font-semibold text-lg">{method.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Дополнительная информация */}
        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mt-8 text-center">
          <h3 className="font-bold text-gray-800 text-xl mb-4">Время работы поддержки</h3>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600">
            <div>
              <div className="font-semibold">Пн-Пт</div>
              <div>9:00 - 18:00</div>
            </div>
            <div>
              <div className="font-semibold">Сб</div>
              <div>10:00 - 16:00</div>
            </div>
            <div>
              <div className="font-semibold">Вс</div>
              <div>Выходной</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
