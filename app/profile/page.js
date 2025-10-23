"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("profile");
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const userData = localStorage.getItem("user");

		if (userData) {
			setUser(JSON.parse(userData));
		}

		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
				<div className="text-white text-xl">Загрузка...</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
				<h1 className="text-white text-xl">Не ваш аккаунт</h1>
			</div>
		);
	}

	const stats = [
		{ label: "Посещено мест", value: "12", icon: "📍" },
		{ label: "Оставлено отзывов", value: "8", icon: "💬" },
		{ label: "В избранном", value: "5", icon: "⭐" }
	];

	const recentActivity = [
		{
			action: "Добавил в избранное",
			place: "Парк Ленинского комсомола",
			time: "2 часа назад",
			icon: "⭐"
		},
		{
			action: "Оставил отзыв",
			place: 'Ресторан "У Федора"',
			time: "1 день назад",
			icon: "💬"
		},
		{
			action: "Построил маршрут",
			place: "Донецкий ботанический сад",
			time: "3 дня назад",
			icon: "🧭"
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
			{/* Хедер */}
			<header className="app-header">
				<div className="container py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white">
								👤
							</div>
							<div>
								<h1 className="text-xl font-bold text-white">Профиль</h1>
								<p className="text-slate-400 text-sm">Ваш туристический опыт</p>
							</div>
						</div>
					</div>
				</div>
			</header>

			<main className="container py-6">
				<div className="dark-card rounded-2xl p-6 text-center mb-6">
					<div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
						👤
					</div>
					<h2 className="text-xl font-bold text-white mb-2">
						{user.nickname || user.name || user.email}
					</h2>
					<p className="text-slate-400 mb-4">Турист • Донецк</p>
					<button className="gradient-primary text-white px-6 py-2 rounded-xl font-medium hover:shadow-soft transition-shadow">
						Редактировать профиль
					</button>
				</div>

				<div className="grid grid-cols-3 gap-3 mb-6">
					{stats.map((stat, index) => (
						<div
							key={stat.label}
							className="dark-card rounded-xl p-4 text-center"
						>
							<div className="text-2xl mb-2">{stat.icon}</div>
							<div className="text-white font-bold text-lg">{stat.value}</div>
							<div className="text-slate-400 text-xs">{stat.label}</div>
						</div>
					))}
				</div>

				<div className="mb-6">
					<h3 className="text-lg font-semibold text-white mb-4">
						Недавняя активность
					</h3>
					<div className="space-y-3">
						{recentActivity.map((activity, index) => (
							<div key={index} className="dark-card rounded-xl p-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-slate-300">
										{activity.icon}
									</div>
									<div className="flex-1">
										<div className="text-white font-medium">
											{activity.action}
										</div>
										<div className="text-slate-400 text-sm">
											{activity.place}
										</div>
									</div>
									<div className="text-slate-400 text-xs">{activity.time}</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-3">
					<button className="w-full dark-card rounded-xl p-4 text-left hover:shadow-medium transition-shadow">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
								⭐
							</div>
							<div>
								<div className="text-white font-medium">Моё избранное</div>
								<div className="text-slate-400 text-sm">Сохраненные места</div>
							</div>
						</div>
					</button>

					<button className="w-full dark-card rounded-xl p-4 text-left hover:shadow-medium transition-shadow">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
								💬
							</div>
							<div>
								<div className="text-white font-medium">Мои отзывы</div>
								<div className="text-slate-400 text-sm">Оставленные отзывы</div>
							</div>
						</div>
					</button>
				</div>
			</main>

			<nav className="mobile-nav fixed bottom-0 left-0 right-0">
				<div className="container">
					<div className="flex justify-around py-3">
						{[
							{ id: "home", icon: "🏠", label: "Главная", href: "/" },
							{ id: "map", icon: "🗺️", label: "Карта", href: "/map" },
							{
								id: "profile",
								icon: "👤",
								label: "Профиль",
								href: "/profile",
								active: true
							},
							{ id: "more", icon: "⋯", label: "Ещё", href: "/more" }
						].map(item => (
							<Link
								key={item.id}
								href={item.href}
								className={`mobile-nav-item flex flex-col items-center gap-1 p-2 rounded-xl ${
									activeTab === item.id
										? "active text-blue-400"
										: "text-slate-400"
								}`}
								onClick={() => setActiveTab(item.id)}
							>
								<div
									className={`nav-icon ${
										activeTab === item.id ? "active" : ""
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
