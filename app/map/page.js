"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import YandexMap from "../../components/YandexMap";

export default function MapPage() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [userLocation, setUserLocation] = useState(null);
	const [mapLoaded, setMapLoaded] = useState(false);
	const [locationLoading, setLocationLoading] = useState(false);
	const [locationError, setLocationError] = useState(null);
	const [activeTab, setActiveTab] = useState("map");

	const categories = [
		{
			id: "all",
			name: "Все места",
			icon: "🏛️",
			color: "gradient-primary",
			count: 156
		},
		{
			id: "park",
			name: "Парки",
			icon: "🏞️",
			color: "gradient-forest",
			count: 42
		},
		{
			id: "cafe",
			name: "Кафе",
			icon: "🍽️",
			color: "gradient-sunset",
			count: 67
		},
		{
			id: "hotel",
			name: "Отели",
			icon: "🏨",
			color: "gradient-ocean",
			count: 28
		},
		{
			id: "museum",
			name: "Музеи",
			icon: "🎨",
			color: "gradient-lavender",
			count: 19
		}
	];

	const locations = [
		{
			id: 1,
			name: "Парк Ленинского комсомола",
			category: "park",
			coordinates: [48.0159, 37.8028],
			address: "ул. Артема, Донецк",
			rating: 4.5,
			reviews: 124,
			image: "🌳",
			badges: ["🌿 Природа", "🚶 Прогулки", "👪 Семейный"]
		},
		{
			id: 2,
			name: "Ресторан 'У Федора'",
			category: "cafe",
			coordinates: [48.0234, 37.8065],
			address: "пр. Мира, 15, Донецк",
			rating: 4.7,
			reviews: 156,
			image: "🍽️",
			badges: ["🍛 Русская кухня", "💫 Премиум"]
		},
		{
			id: 3,
			name: "Гостиница 'Донбасс Палас'",
			category: "hotel",
			coordinates: [48.0187, 37.8091],
			address: "ул. Щорса, 45, Донецк",
			rating: 4.6,
			reviews: 89,
			image: "🏨",
			badges: ["⭐ 5 звезд", "🏊 Бассейн"]
		},
		{
			id: 4,
			name: "Донецкий краеведческий музей",
			category: "museum",
			coordinates: [48.0205, 37.8042],
			address: "ул. Челюскинцев, 189, Донецк",
			rating: 4.8,
			reviews: 203,
			image: "🎨",
			badges: ["📚 История", "🏛️ Культура"]
		}
	];

	// [Остальной код определения местоположения без изменений]
	const getCurrentLocation = () => {
		setLocationLoading(true);
		setLocationError(null);

		if (!navigator.geolocation) {
			setLocationError("Геолокация не поддерживается вашим браузером");
			setLocationLoading(false);
			return;
		}

		const options = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 60000
		};

		navigator.geolocation.getCurrentPosition(
			position => {
				const newLocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
					accuracy: position.coords.accuracy
				};
				setUserLocation(newLocation);
				setLocationLoading(false);
			},
			error => {
				setLocationLoading(false);
				let errorMessage = "Не удалось определить местоположение";

				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMessage =
							"Доступ к геолокации запрещен. Разрешите доступ в настройках браузера";
						break;
					case error.POSITION_UNAVAILABLE:
						errorMessage = "Информация о местоположении недоступна";
						break;
					case error.TIMEOUT:
						errorMessage = "Время ожидания определения местоположения истекло";
						break;
					default:
						errorMessage = "Произошла неизвестная ошибка";
				}

				setLocationError(errorMessage);
				setUserLocation({
					lat: 48.0159,
					lng: 37.8028,
					accuracy: 1000
				});
			},
			options
		);
	};

	useEffect(() => {
		getCurrentLocation();
		setTimeout(() => setMapLoaded(true), 1000);
	}, []);

	const filteredLocations = locations.filter(
		l => selectedCategory === "all" || l.category === selectedCategory
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 decorative-dots">
			{/* Улучшенный хедер */}
			<header className="app-header glass-effect shadow-glow">
				<div className="container py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="icon-wrapper gradient-primary shadow-float text-white text-xl">
								🗺️
							</div>
							<div>
								<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									Интерактивная карта
								</h1>
								<p className="text-slate-600 text-sm flex items-center gap-1">
									<span>📍</span> Исследуйте ДНР в реальном времени
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3">
							{locationLoading && (
								<div className="hidden md:flex items-center gap-2 text-sm text-slate-600 bg-white/80 px-3 py-2 rounded-xl">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
									<span>Определяем...</span>
								</div>
							)}
							<button
								onClick={getCurrentLocation}
								disabled={locationLoading}
								className={`px-5 py-3 rounded-2xl font-medium transition-all flex items-center gap-3 ${
									locationLoading
										? "bg-slate-300 text-slate-500 cursor-not-allowed"
										: "gradient-primary text-white hover-lift shadow-soft"
								}`}
							>
								{locationLoading ? "⏳" : "📍"}
								<span className="hidden sm:inline">
									{locationLoading ? "Определяем..." : "Мое местоположение"}
								</span>
							</button>
						</div>
					</div>
				</div>
			</header>

			<div className="container py-6">
				<div className="grid lg:grid-cols-4 gap-6">
					{/* Улучшенный сайдбар */}
					<div className="lg:col-span-1">
						<div className="light-card rounded-3xl shadow-soft p-6 border border-slate-200/50 glass-effect sticky top-6">
							<h3 className="font-bold high-contrast-text text-xl mb-6 flex items-center gap-2">
								<span>🏷️</span>
								Категории
							</h3>

							<div className="space-y-3 mb-8">
								{categories.map(category => (
									<button
										key={category.id}
										onClick={() => setSelectedCategory(category.id)}
										className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-4 group hover-lift ${
											selectedCategory === category.id
												? `${category.color} text-white shadow-medium`
												: "bg-white/80 hover:bg-white text-slate-700 shadow-soft"
										}`}
									>
										<div
											className={`icon-wrapper ${
												selectedCategory === category.id
													? "bg-white/20 text-white"
													: "bg-slate-100 text-slate-600"
											} text-lg`}
										>
											{category.icon}
										</div>
										<div className="flex-1">
											<div className="font-semibold">{category.name}</div>
											<div
												className={`text-sm ${
													selectedCategory === category.id
														? "text-white/80"
														: "text-slate-500"
												}`}
											>
												{category.count} мест
											</div>
										</div>
										{selectedCategory === category.id && (
											<div className="w-2 h-2 bg-white rounded-full"></div>
										)}
									</button>
								))}
							</div>

							{/* Информация о местоположении */}
							<div className="mb-8">
								<h4 className="font-semibold high-contrast-text mb-4 flex items-center gap-2">
									<span>📍</span>
									Ваше местоположение
								</h4>
								<div className="space-y-3">
									{userLocation ? (
										<div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
											<div className="flex items-center gap-2 text-green-700 mb-2">
												<span className="text-lg">✅</span>
												<span className="font-semibold">Определено</span>
											</div>
											<div className="text-sm text-green-600 space-y-1">
												<div>Ш: {userLocation.lat.toFixed(6)}</div>
												<div>Д: {userLocation.lng.toFixed(6)}</div>
												{userLocation.accuracy && (
													<div className="text-xs text-green-500 mt-2">
														🎯 Точность: ±{userLocation.accuracy}м
													</div>
												)}
											</div>
										</div>
									) : (
										<div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
											<div className="flex items-center gap-2 text-amber-700">
												<span>📍</span>
												<span className="text-sm">
													Определяем местоположение...
												</span>
											</div>
										</div>
									)}

									{locationError && (
										<div className="p-4 bg-red-50 rounded-2xl border border-red-200">
											<div className="flex items-center gap-2 text-red-700 mb-2">
												<span>⚠️</span>
												<span className="font-semibold text-sm">Ошибка</span>
											</div>
											<div className="text-xs text-red-600">
												{locationError}
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Быстрые действия */}
							<div className="space-y-3">
								<Link
									href="/locations"
									className="w-full p-4 gradient-primary text-white rounded-2xl font-semibold hover-lift transition-all flex items-center justify-center gap-3 shadow-soft"
								>
									<span>🏛️</span>
									Все локации
								</Link>
								<Link
									href="/favorites"
									className="w-full p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold hover-lift transition-all flex items-center justify-center gap-3 shadow-soft"
								>
									<span>⭐</span>
									Избранное
								</Link>
							</div>
						</div>
					</div>

					{/* Основной контент */}
					<div className="lg:col-span-3">
						{/* Карта */}
						<div className="light-card rounded-3xl shadow-soft overflow-hidden border border-slate-200/50 glass-effect mb-6">
							{mapLoaded ? (
								<YandexMap
									locations={filteredLocations}
									userLocation={userLocation}
								/>
							) : (
								<div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl flex items-center justify-center">
									<div className="text-center">
										<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
										<p className="text-slate-600">Загрузка карты...</p>
									</div>
								</div>
							)}
						</div>

						{/* Список локаций на карте */}
						<div className="light-card rounded-3xl shadow-soft p-6 border border-slate-200/50 glass-effect">
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-xl font-bold high-contrast-text flex items-center gap-3">
									<span>📌</span>
									Объекты на карте
									<span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
										{filteredLocations.length} мест
									</span>
								</h3>
								<div className="flex items-center gap-2 text-sm text-slate-500">
									<span>🎯</span>
									<span>Кликните на метку для информации</span>
								</div>
							</div>

							<div className="grid md:grid-cols-2 gap-4">
								{filteredLocations.map(location => (
									<div
										key={location.id}
										className="bg-white/80 rounded-2xl p-4 hover-lift transition-all group border border-slate-200/50"
									>
										<div className="flex items-start gap-4">
											<div
												className={`icon-wrapper ${
													location.category === "park"
														? "gradient-forest"
														: location.category === "cafe"
														? "gradient-sunset"
														: location.category === "hotel"
														? "gradient-ocean"
														: "gradient-lavender"
												} text-white text-lg flex-shrink-0`}
											>
												{location.image}
											</div>

											<div className="flex-1 min-w-0">
												<h4 className="font-bold high-contrast-text text-lg mb-1 group-hover:text-blue-600 transition-colors">
													{location.name}
												</h4>
												<p className="text-slate-600 text-sm mb-2 truncate">
													{location.address}
												</p>

												<div className="flex items-center gap-4 mb-3">
													<div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
														<span className="text-amber-600 text-sm">⭐</span>
														<span className="font-semibold text-slate-800 text-sm">
															{location.rating}
														</span>
														<span className="text-slate-500 text-xs">
															({location.reviews})
														</span>
													</div>
												</div>

												<div className="flex flex-wrap gap-1">
													{location.badges.map((badge, idx) => (
														<span
															key={idx}
															className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs"
														>
															{badge}
														</span>
													))}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

							{filteredLocations.length === 0 && (
								<div className="text-center py-12">
									<div className="text-6xl mb-4">🔍</div>
									<h4 className="text-xl font-semibold high-contrast-text mb-2">
										Места не найдены
									</h4>
									<p className="text-slate-600 mb-6">
										Попробуйте выбрать другую категорию
									</p>
									<button
										onClick={() => setSelectedCategory("all")}
										className="btn-link"
									>
										<span>🔄</span>
										Показать все места
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Улучшенная мобильная навигация */}
			<nav className="mobile-nav glass-effect shadow-glow fixed bottom-0 left-0 right-0">
				<div className="container">
					<div className="flex justify-around py-4">
						{[
							{ id: "home", icon: "🏠", label: "Главная", href: "/" },
							{
								id: "map",
								icon: "🗺️",
								label: "Карта",
								href: "/map",
								active: true
							},
							{ id: "profile", icon: "👤", label: "Профиль", href: "/profile" },
							{ id: "more", icon: "⋯", label: "Ещё", href: "/more" }
						].map(item => (
							<Link
								key={item.id}
								href={item.href}
								className={`mobile-nav-item flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
									activeTab === item.id
										? "active text-blue-600 bg-white shadow-soft"
										: "text-slate-600 hover:bg-white/50"
								}`}
								onClick={() => setActiveTab(item.id)}
							>
								<div
									className={`nav-icon text-lg ${
										activeTab === item.id ? "active scale-110" : ""
									}`}
								>
									{item.icon}
								</div>
								<span className="text-xs font-medium">{item.label}</span>
							</Link>
						))}
					</div>
				</div>
			</nav>
		</div>
	);
}
