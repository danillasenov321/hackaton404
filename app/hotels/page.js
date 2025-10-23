"use client";
import { useState } from "react";
import { locations } from "../../lib/data";
import BottomNavigation from "../../components/BottomNavigation";

export default function HotelsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [priceRange, setPriceRange] = useState([1000, 5000]);
	const [selectedStars, setSelectedStars] = useState([]);

	const hotelLocations = locations.filter(
		location => location.category === "hotel"
	);

	const starOptions = [5, 4, 3];
	const hotelTypes = [
		{ id: "all", name: "Все", icon: "🏨" },
		{ id: "hotel", name: "Отели", icon: "🏨" },
		{ id: "apartment", name: "Апартаменты", icon: "🏠" },
		{ id: "hostel", name: "Хостелы", icon: "🛏️" },
		{ id: "luxury", name: "Люкс", icon: "⭐" }
	];

	const toggleStar = star => {
		setSelectedStars(prev =>
			prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
		);
	};

	const renderStars = count => {
		return "⭐".repeat(count);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/30 pb-20">
			<header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-strong">
				<div className="container py-6">
					<div className="flex items-center gap-4 mb-6">
						<div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
							🏨
						</div>
						<div>
							<h1 className="text-3xl font-bold">Отели и проживание</h1>
							<p className="opacity-90">Комфортный отдых в Донецке</p>
						</div>
					</div>

					<div className="relative max-w-2xl mb-4">
						<div className="search-icon">🔍</div>
						<input
							type="text"
							placeholder="Поиск отелей, апартаментов..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="search-input bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70"
						/>
					</div>
					<div className="flex gap-2 overflow-x-auto">
						{hotelTypes.map(type => (
							<button
								key={type.id}
								className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-2xl font-medium whitespace-nowrap hover:bg-white/30 transition-all"
							>
								<span>{type.icon}</span>
								<span>{type.name}</span>
							</button>
						))}
					</div>
				</div>
			</header>

			{/* Основной контент */}
			<div className="container">
				<div className="grid lg:grid-cols-4 gap-8">
					{/* Сайдбар с фильтрами */}
					<aside className="lg:col-span-1">
						<div className="bg-white rounded-3xl p-6 shadow-soft sticky top-24">
							<h3 className="font-bold text-lg mb-4">Фильтры</h3>

							{/* Звезды */}
							<div className="mb-6">
								<h4 className="font-semibold mb-3">Количество звезд</h4>
								<div className="space-y-2">
									{starOptions.map(star => (
										<label
											key={star}
											className="flex items-center gap-3 cursor-pointer"
										>
											<input
												type="checkbox"
												checked={selectedStars.includes(star)}
												onChange={() => toggleStar(star)}
												className="w-4 h-4 text-blue-600 rounded"
											/>
											<span className="flex items-center gap-1">
												{renderStars(star)}
												<span className="text-sm text-gray-600">и выше</span>
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Цена */}
							<div className="mb-6">
								<h4 className="font-semibold mb-3">Цена за ночь</h4>
								<div className="space-y-3">
									<input
										type="range"
										min="500"
										max="10000"
										step="100"
										value={priceRange[1]}
										onChange={e =>
											setPriceRange([priceRange[0], parseInt(e.target.value)])
										}
										className="w-full"
									/>
									<div className="flex justify-between text-sm text-gray-600">
										<span>500 ₽</span>
										<span className="font-semibold text-blue-600">
											до {priceRange[1]} ₽
										</span>
										<span>10000 ₽</span>
									</div>
								</div>
							</div>

							<button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-soft transition-all">
								Применить фильтры
							</button>
						</div>
					</aside>

					{/* Сетка отелей */}
					<main className="lg:col-span-3">
						<div className="grid gap-6">
							{hotelLocations.map((location, index) => (
								<div
									key={location.id}
									className="bg-white rounded-3xl shadow-soft overflow-hidden hover-lift group border border-blue-100"
								>
									<div className="flex flex-col md:flex-row">
										{/* Изображение */}
										<div
											className={`md:w-1/3 h-48 md:h-auto relative overflow-hidden ${
												index % 3 === 0
													? "gradient-ocean"
													: index % 3 === 1
													? "gradient-lavender"
													: "gradient-mint"
											}`}
										>
											<div className="absolute inset-0 flex items-center justify-center text-4xl text-white">
												{location.image}
											</div>
											<div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
												⭐ {location.rating}
											</div>
										</div>

										{/* Контент */}
										<div className="md:w-2/3 p-6">
											<div className="flex items-start justify-between mb-3">
												<div>
													<h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
														{location.name}
													</h3>
													<div className="flex items-center gap-2 mb-2">
														<span className="text-yellow-500">
															{renderStars(4)}
														</span>
														<span className="text-sm text-gray-500">
															• {location.type || "Отель"}
														</span>
													</div>
												</div>
												<div className="text-right">
													<div className="text-2xl font-bold text-blue-600">
														от 2 500 ₽
													</div>
													<div className="text-sm text-gray-500">за ночь</div>
												</div>
											</div>

											<p className="text-gray-600 mb-4 leading-relaxed">
												{location.description}
											</p>

											<div className="grid grid-cols-2 gap-3 mb-4">
												<div className="flex items-center gap-2 text-sm text-gray-600">
													<span>📍</span>
													<span>{location.address}</span>
												</div>
												<div className="flex items-center gap-2 text-sm text-gray-600">
													<span>🕒</span>
													<span>Заезд: 14:00</span>
												</div>
												<div className="flex items-center gap-2 text-sm text-gray-600">
													<span>📞</span>
													<span>{location.phone || "+7 (XXX) XXX-XX-XX"}</span>
												</div>
												<div className="flex items-center gap-2 text-sm text-gray-600">
													<span>💬</span>
													<span>{location.reviews} отзывов</span>
												</div>
											</div>

											<div className="flex gap-3">
												<button className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-soft transition-all text-center">
													Забронировать
												</button>
												<button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all">
													📷
												</button>
												<button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all">
													♡
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Сообщение если нет результатов */}
						{hotelLocations.length === 0 && (
							<div className="text-center py-12">
								<div className="text-6xl mb-4">🏨</div>
								<h3 className="text-xl font-semibold text-gray-700 mb-2">
									Пока нет отелей
								</h3>
								<p className="text-gray-500">
									Скоро здесь появятся лучшие отели Донецка
								</p>
							</div>
						)}
					</main>
				</div>
			</div>

			<BottomNavigation />
		</div>
	);
}
