export const locations = [
  {
    id: 1,
    name: "Парк Ленинского комсомола",
    category: "park",
    address: "ул. Артема, Донецк",
    coordinates: { lat: 48.0159, lng: 37.8028 },
    description: "Крупнейший парк города с аттракционами и зонами отдыха",
    images: ["/images/park1.jpg", "/images/park2.jpg"],
    workingHours: "круглосуточно",
    rating: 4.5,
    reviews: 24
  },
  {
    id: 2,
    name: "Ресторан 'У Федора'",
    category: "cafe",
    address: "пр. Мира, 15, Донецк",
    coordinates: { lat: 48.0234, lng: 37.8065 },
    description: "Традиционная русская кухня в уютной атмосфере",
    images: ["/images/restaurant1.jpg"],
    workingHours: "10:00-23:00",
    rating: 4.8,
    reviews: 56
  },
  {
    id: 3,
    name: "Гостиница 'Донбасс Палас'",
    category: "hotel", 
    address: "ул. Щорса, 45, Донецк",
    coordinates: { lat: 48.0187, lng: 37.8091 },
    description: "Пятизвездочный отель в центре города",
    images: ["/images/hotel1.jpg"],
    workingHours: "круглосуточно",
    rating: 4.7,
    reviews: 89
  }
]

export const categories = [
  { id: 'all', name: 'Все' },
  { id: 'park', name: 'Парки' },
  { id: 'cafe', name: 'Кафе и рестораны' },
  { id: 'hotel', name: 'Отели' },
  { id: 'museum', name: 'Музеи' },
  { id: 'monument', name: 'Памятники' }
]