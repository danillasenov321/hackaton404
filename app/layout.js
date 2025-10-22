import './globals.css'

export const metadata = {
  title: 'Гид по ДНР - Туристический путеводитель',
  description: 'Интерактивный гид по достопримечательностям Донецкой Народной Республики',
  keywords: 'ДНР, Донецк, туризм, достопримечательности, карта, маршруты',
  authors: [{ name: 'Команда хакатона' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#667eea',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}