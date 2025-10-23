"use client";
import { useState } from "react";
import BottomNavigation from "../../components/BottomNavigation";

export default function RoutesPage() {
	const [startPoint, setStartPoint] = useState("");
	const [endPoint, setEndPoint] = useState("");
	const [currentRoute, setCurrentRoute] = useState(null);

	const popularDestinations = [
		{ name: "Парк Ленинского комсомола", icon: "🌳" },
		{ name: "Донецкий ботанический сад", icon: "🌿" },
		{ name: "Площадь Ленина", icon: "🏛️" },
		{ name: 'ТРЦ "Донецк-Сити"', icon: "🛍️" }
	];

	const buildRoute = () => {
		// Заглушка для построения маршрута
		setCurrentRoute({
			distance: "3.2 км",
			time: "25 мин",
			steps: [
				"Начать движение",
				"Следовать по ул. Артема",
				"Повернуть на пр. Мира"
			]
		});
	};

	return (
		<div className="min-h-screen bg-gray-50 pb-20">
			<header className="bg-white shadow-sm">
				<div className="container py-4">
					<h1 className="text-xl font-semibold">🧭 Маршруты</h1>
				</div>
			</header>

			<div className="container py-6">
				{/* Форма построения маршрута */}
				<div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-2">Откуда</label>
							<input
								type="text"
								placeholder="Ваше местоположение"
								value={startPoint}
								onChange={e => setStartPoint(e.target.value)}
								className="w-full p-3 border border-gray-300 rounded-lg"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2">Куда</label>
							<input
								type="text"
								placeholder="Выберите destination"
								value={endPoint}
								onChange={e => setEndPoint(e.target.value)}
								className="w-full p-3 border border-gray-300 rounded-lg"
							/>
						</div>

						<button
							onClick={buildRoute}
							className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold"
						>
							Построить маршрут
						</button>
					</div>
				</div>

				{/* Популярные направления */}
				<div className="bg-white rounded-2xl shadow-sm p-6">
					<h2 className="text-lg font-semibold mb-4">Популярные направления</h2>
					<div className="space-y-3">
						{popularDestinations.map((dest, index) => (
							<button
								key={index}
								onClick={() => setEndPoint(dest.name)}
								className="w-full p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 flex items-center gap-3"
							>
								<span className="text-xl">{dest.icon}</span>
								<span>{dest.name}</span>
							</button>
						))}
					</div>
				</div>

				{/* Текущий маршрут */}
				{currentRoute && (
					<div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
						<h3 className="text-lg font-semibold mb-4">Текущий маршрут</h3>
						<div className="space-y-2">
							{currentRoute.steps.map((step, index) => (
								<div key={index} className="flex items-center gap-3">
									<div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
										{index + 1}
									</div>
									<span>{step}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<BottomNavigation />
		</div>
	);
}
