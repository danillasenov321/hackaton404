"use client";
import { useState, useEffect } from "react";
import BottomNavigation from "../../components/BottomNavigation";

export default function CafesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState("all");
	const [cafeLocations, setCafeLocations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const req = await fetch("objects.json");
				if (!req.ok) {
					throw new Error(`HTTP error! status: ${req.status}`);
				}
				const db = await req.json();
				const cafes = db.filter(location => location.type === 3);
				setCafeLocations(cafes);
			} catch (err) {
				console.error("Ошибка загрузки данных:", err);
				setError("Не удалось загрузить данные");

				setCafeLocations([
					{
						id: 1,
						name: "Кофейня Центральная",
						description: "Уютное место в центре города",
						rating: 4.5,
						reviews: 128,
						workingHours: "8:00-23:00",
						image: "☕",
						type: "Кафе",
						distance: "1.2 км"
					},
					{
						id: 2,
						name: "Ресторан Старый Город",
						description: "Европейская кухня в историческом здании",
						rating: 4.8,
						reviews: 256,
						workingHours: "12:00-00:00",
						image: "🏮",
						type: "Ресторан",
						distance: "0.8 км"
					}
				]);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const filters = [
		{ id: "all", name: "Все", icon: "🍽️" },
		{ id: "restaurant", name: "Рестораны", icon: "🏮" },
		{ id: "cafe", name: "Кафе", icon: "☕" },
		{ id: "fastfood", name: "Фастфуд", icon: "🍔" },
		{ id: "bar", name: "Бары", icon: "🍸" }
	];

	const filteredLocations = cafeLocations.filter(location => {
		const matchesSearch =
			location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			location.description.toLowerCase().includes(searchTerm.toLowerCase());

		if (activeFilter === "all") return matchesSearch;
		return matchesSearch && location.type?.toLowerCase().includes(activeFilter);
	});

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-red-50/30 flex items-center justify-center">
				<div className="text-center">
					<div className="text-4xl mb-4 animate-pulse">🍽️</div>
					<p className="text-gray-600">Загрузка заведений...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-red-50/30 flex items-center justify-center">
				<div className="text-center">
					<div className="text-4xl mb-4">⚠️</div>
					<p className="text-gray-600 mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-orange-500 text-white rounded-lg"
					>
						Попробовать снова
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-red-50/30 pb-20">
			<header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-strong">
				<div className="container py-6">
					<div className="flex items-center gap-4 mb-6">
						<div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
							🍽️
						</div>
						<div>
							<h1 className="text-3xl font-bold">Кафе и рестораны</h1>
							<p className="opacity-90">Откройте вкусы Донецка</p>
						</div>
					</div>

					{/* Поиск */}
					<div className="relative max-w-2xl">
						<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
							🔍
						</div>
						<input
							type="text"
							placeholder="Поиск ресторанов, кафе, баров..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
						/>
					</div>
				</div>
			</header>

			{/* Фильтры */}
			<section className="container -mt-4 mb-8">
				<div className="flex gap-2 overflow-x-auto pb-2">
					{filters.map(filter => (
						<button
							key={filter.id}
							onClick={() => setActiveFilter(filter.id)}
							className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
								activeFilter === filter.id
									? "bg-white text-orange-600 shadow-medium"
									: "bg-white/80 text-gray-600 hover:bg-white hover:shadow-soft"
							}`}
						>
							<span>{filter.icon}</span>
							<span>{filter.name}</span>
						</button>
					))}
				</div>
			</section>

			{/* Сетка заведений */}
			<section className="container">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredLocations.map((location, index) => (
						<div
							key={location.id}
							className="bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 group border border-orange-100"
						>
							{/* Верхняя часть с градиентом */}
							<div
								className={`h-32 relative overflow-hidden ${
									index % 3 === 0
										? "bg-gradient-to-r from-orange-400 to-red-400"
										: index % 3 === 1
										? "bg-gradient-to-r from-amber-400 to-orange-400"
										: "bg-gradient-to-r from-purple-400 to-pink-400"
								}`}
							>
								<div className="absolute inset-0 flex items-center justify-center text-4xl text-white">
									{location.image}
								</div>
								<div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
									⭐ {location.rating}
								</div>
								<div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
									🕒 {location.workingHours}
								</div>
							</div>

							{/* Контент */}
							<div className="p-5">
								<h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
									{location.name}
								</h3>
								<p className="text-gray-600 mb-3 text-sm leading-relaxed">
									{location.description}
								</p>

								<div className="flex items-center gap-2 mb-3">
									<span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
										{location.type || "Кафе"}
									</span>
									<span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
										📍 {location.distance || "2.1 км"}
									</span>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-1 text-sm text-gray-500">
										<span>💬</span>
										<span>{location.reviews} отзывов</span>
									</div>
									<button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-medium hover:shadow-soft transition-all">
										Забронировать
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{filteredLocations.length === 0 && (
					<div className="text-center py-12">
						<div className="text-6xl mb-4">🍽️</div>
						<h3 className="text-xl font-semibold text-gray-700 mb-2">
							Ничего не найдено
						</h3>
						<p className="text-gray-500">
							Попробуйте изменить поисковый запрос или выбрать другую категорию
						</p>
					</div>
				)}
			</section>

			<BottomNavigation />
		</div>
	);
}
