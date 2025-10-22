'use client'
import { useEffect, useRef, useState } from 'react'

const YandexMap = ({ locations, userLocation }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [apiLoaded, setApiLoaded] = useState(false)

  useEffect(() => {
    // Загружаем Яндекс.Карты асинхронно
    const loadYandexMap = async () => {
      // Если API уже загружено, сразу инициализируем карту
      if (window.ymaps) {
        setApiLoaded(true)
        initMap()
        return
      }

      // Проверяем, не загружается ли API уже
      if (window.ymapsLoading) {
        // Ждем завершения загрузки
        const checkLoaded = setInterval(() => {
          if (window.ymaps) {
            clearInterval(checkLoaded)
            setApiLoaded(true)
            initMap()
          }
        }, 100)
        return
      }

      // Помечаем, что начали загрузку
      window.ymapsLoading = true

      // Загружаем API Яндекс.Карт
      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=b523cfc6-0515-41a9-b9dc-004a80af7b55&lang=ru_RU'
      script.async = true
      
      script.onload = () => {
        window.ymapsLoading = false
        setApiLoaded(true)
        window.ymaps.ready(initMap)
      }

      script.onerror = () => {
        window.ymapsLoading = false
        console.error('Failed to load Yandex Maps API')
      }

      document.head.appendChild(script)
    }

    const initMap = () => {
      if (!window.ymaps || !mapRef.current) return

      // Если карта уже создана, обновляем метки
      if (mapInstanceRef.current) {
        updateMapMarkers()
        return
      }

      // Создаем карту
      mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
        center: userLocation ? [userLocation.lat, userLocation.lng] : [48.0159, 37.8028],
        zoom: 12,
        controls: ['zoomControl', 'fullscreenControl']
      })

      // Добавляем метки
      updateMapMarkers()
    }

    const updateMapMarkers = () => {
      if (!mapInstanceRef.current || !window.ymaps) return

      // Очищаем старые метки
      mapInstanceRef.current.geoObjects.removeAll()

      // Добавляем метки локаций
      locations.forEach(location => {
        const placemark = new window.ymaps.Placemark(
          location.coordinates,
          {
            balloonContent: `
              <div style="padding: 8px;">
                <strong style="font-size: 14px;">${location.name}</strong><br/>
                <em style="color: #666; font-size: 12px;">${location.address}</em>
              </div>
            `
          },
          {
            preset: getPresetByCategory(location.category)
          }
        )
        
        mapInstanceRef.current.geoObjects.add(placemark)
      })

      // Добавляем метку пользователя
      if (userLocation) {
        const userPlacemark = new window.ymaps.Placemark(
          [userLocation.lat, userLocation.lng],
          {
            balloonContent: 'Ваше местоположение'
          },
          {
            preset: 'islands#blueCircleDotIcon'
          }
        )
        mapInstanceRef.current.geoObjects.add(userPlacemark)
      }
    }

    const getPresetByCategory = (category) => {
      const presets = {
        park: 'islands#greenIcon',
        cafe: 'islands#redIcon', 
        hotel: 'islands#blueIcon',
        museum: 'islands#violetIcon'
      }
      return presets[category] || 'islands#grayIcon'
    }

    loadYandexMap()

    return () => {
      // Очистка при размонтировании
      // Не уничтожаем карту полностью, чтобы не перезагружать API
    }
  }, [locations, userLocation])

  return (
    <div className="w-full h-96 rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
      {!apiLoaded && (
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-slate-600 text-sm">Загрузка карты...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ minHeight: '400px', display: apiLoaded ? 'block' : 'none' }}
      />
    </div>
  )
}

export default YandexMap