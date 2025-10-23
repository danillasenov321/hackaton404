// components/YandexMap.js
'use client'
import { useEffect, useRef, useState } from 'react'

let ymapsLoaded = false
let ymapsLoading = false

export default function YandexMap({ locations = [], userLocation = null }) {
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    let mapInstance = null
    let isMounted = true

    const loadYandexMaps = () => {
      return new Promise((resolve, reject) => {
        if (window.ymaps && ymapsLoaded) {
          resolve()
          return
        }

        if (ymapsLoading) {
          const checkLoaded = () => {
            if (window.ymaps && ymapsLoaded) {
              resolve()
            } else {
              setTimeout(checkLoaded, 100)
            }
          }
          checkLoaded()
          return
        }

        ymapsLoading = true
        const script = document.createElement('script')
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
        script.onload = () => {
          ymapsLoaded = true
          ymapsLoading = false
          resolve()
        }
        script.onerror = () => {
          ymapsLoading = false
          reject(new Error('Failed to load Yandex Maps'))
        }
        document.head.appendChild(script)
      })
    }

    const initMap = async () => {
      try {
        if (!isMounted || !mapRef.current) return

        await loadYandexMaps()

        window.ymaps.ready(() => {
          if (!isMounted || !mapRef.current) return

          // Центр по умолчанию - Донецк
          const center = userLocation 
            ? [userLocation.lat, userLocation.lng] 
            : [48.0159, 37.8028]
          
          console.log('Creating map with center:', center)

          // Создаем карту
          mapInstance = new window.ymaps.Map(mapRef.current, {
            center: center,
            zoom: 13,
            controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
          })

          console.log('Map created successfully')

          // Добавляем метку пользователя
          if (userLocation) {
            const userPlacemark = new window.ymaps.Placemark(
              [userLocation.lat, userLocation.lng],
              {
                hintContent: 'Вы здесь',
                balloonContent: 'Ваше текущее местоположение'
              },
              {
                preset: 'islands#greenDotIcon',
                iconColor: '#10b981'
              }
            )
            mapInstance.geoObjects.add(userPlacemark)
            console.log('User location marker added')
          }

          // Добавляем метки локаций
          if (locations && locations.length > 0) {
            console.log('Adding', locations.length, 'locations')
            
            locations.forEach((location, index) => {
              try {
                // Определяем цвет иконки по категории
                const getIconColor = (category) => {
                  const colors = {
                    park: 'green',
                    hotel: 'blue',
                    cafe: 'orange',
                    museum: 'violet',
                    shop: 'red',
                    entertainment: 'pink',
                    donetsk: 'darkBlue'
                  }
                  return colors[category] || 'blue'
                }

                const placemark = new window.ymaps.Placemark(
                  location.coordinates,
                  {
                    hintContent: location.name,
                    balloonContent: `
                      <div style="padding: 12px; max-width: 280px; font-family: Arial, sans-serif;">
                        <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${location.name}</h3>
                        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${location.description}</p>
                        <div style="display: flex; align-items: center; gap: 8px; margin: 8px 0;">
                          <span style="color: #f59e0b; font-weight: bold;">⭐ ${location.rating}</span>
                          <span style="color: #9ca3af;">(${location.reviews} отзывов)</span>
                        </div>
                        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">📍 ${location.address}</p>
                        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">🕒 ${location.workingHours}</p>
                        ${location.badges ? `
                          <div style="margin: 8px 0; display: flex; flex-wrap: wrap; gap: 4px;">
                            ${location.badges.map(badge => 
                              `<span style="background: #f3f4f6; color: #4b5563; padding: 4px 8px; border-radius: 12px; font-size: 11px;">${badge}</span>`
                            ).join('')}
                          </div>
                        ` : ''}
                      </div>
                    `
                  },
                  {
                    preset: 'islands#icon',
                    iconColor: getIconColor(location.category)
                  }
                )
                
                mapInstance.geoObjects.add(placemark)
                console.log(`Added location ${index + 1}: ${location.name}`)
              } catch (error) {
                console.error('Error adding location:', location.name, error)
              }
            })
          }

          setMapReady(true)
        })

      } catch (error) {
        console.error('Error initializing map:', error)
        if (isMounted) {
          setMapReady(false)
        }
      }
    }

    initMap()

    return () => {
      isMounted = false
      if (mapInstance) {
        try {
          mapInstance.destroy()
          console.log('Map destroyed')
        } catch (error) {
          console.error('Error destroying map:', error)
        }
      }
    }
  }, [locations, userLocation])

  return (
    <div className="w-full h-full relative">
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Загрузка карты...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ 
          minHeight: '500px',
          opacity: mapReady ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  )
}