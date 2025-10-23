// app/login/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleLogin = async e => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email,
					password
				})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Ошибка входа");
			}

			if (!data.succes) {
				throw new Error("Неверный email или пароль");
			}

			localStorage.setItem("user", JSON.stringify(data.user));

			router.push("/profile");
		} catch (error) {
			console.error("Ошибка входа:", error);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
			<div className="max-w-md w-full">
				<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-white/30">
					<div className="text-center mb-8">
						<div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
							👤
						</div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Вход в аккаунт
						</h1>
						<p className="text-gray-600 mt-2">
							Войдите, чтобы получить полный доступ
						</p>
					</div>

					{error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
							{error}
						</div>
					)}

					<form onSubmit={handleLogin} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder="your@email.com"
								className="w-full p-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Пароль
							</label>
							<input
								type="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder="Введите пароль"
								className="w-full p-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								required
							/>
						</div>

						<div className="flex items-center justify-between">
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={rememberMe}
									onChange={e => setRememberMe(e.target.checked)}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-600">
									Запомнить меня
								</span>
							</label>

							<Link
								href="/forgot-password"
								className="text-sm text-blue-600 hover:text-blue-700"
							>
								Забыли пароль?
							</Link>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 ${
								isLoading
									? "bg-gray-400 cursor-not-allowed"
									: "gradient-primary text-white hover-lift shadow-soft"
							}`}
						>
							{isLoading ? (
								<>
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
									<span>Вход...</span>
								</>
							) : (
								<>
									<span>🔐</span>
									<span>Войти в аккаунт</span>
								</>
							)}
						</button>
					</form>

					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">или</span>
						</div>
					</div>
					<div className="space-y-3">
						<button className="w-full p-4 bg-white border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
							<span className="text-blue-600">🔵</span>
							<span>Войти через ВКонтакте</span>
						</button>

						<button className="w-full p-4 bg-white border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
							<span className="text-red-500">🔴</span>
							<span>Войти через Google</span>
						</button>
					</div>
					<div className="text-center mt-6">
						<p className="text-gray-600">
							Ещё нет аккаунта?{" "}
							<Link
								href="/register"
								className="text-blue-600 font-semibold hover:text-blue-700"
							>
								Зарегистрироваться
							</Link>
						</p>
					</div>
				</div>

				<div className="text-center mt-6">
					<p className="text-sm text-gray-500">
						Войдите, чтобы сохранять избранные места и оставлять отзывы
					</p>
				</div>
			</div>
		</div>
	);
}
