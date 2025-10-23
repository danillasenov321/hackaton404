"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleRegister = async e => {
		e.preventDefault();
		setError("");

		if (formData.password !== formData.confirmPassword) {
			setError("Пароли не совпадают");
			return;
		}

		if (formData.password.length < 6) {
			setError("Пароль должен содержать минимум 6 символов");
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("http://localhost:3001/api/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					password: formData.password
				})
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Ошибка регистрации");
			}

			localStorage.setItem("user", JSON.stringify(data.user));
			router.push("/profile");
		} catch (error) {
			console.error("Ошибка регистрации:", error);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
		if (error) setError("");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
			<div className="max-w-md w-full">
				<div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-white/30">
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
							🎉
						</div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
							Создать аккаунт
						</h1>
						<p className="text-gray-600 mt-2">
							Присоединяйтесь к нашему сообществу
						</p>
					</div>

					{error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
							{error}
						</div>
					)}

					<form onSubmit={handleRegister} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Имя
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Ваше имя"
								className="w-full p-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
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
								name="password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Создайте пароль"
								className="w-full p-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								required
								minLength="6"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Подтвердите пароль
							</label>
							<input
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								placeholder="Повторите пароль"
								className="w-full p-4 bg-gray-50/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
								required
							/>
						</div>

						<div className="flex items-center">
							<input
								type="checkbox"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
								required
							/>
							<label className="ml-2 text-sm text-gray-600">
								Я соглашаюсь с{" "}
								<Link
									href="/terms"
									className="text-blue-600 hover:text-blue-700"
								>
									условиями использования
								</Link>
							</label>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 ${
								isLoading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-gradient-to-r from-green-500 to-blue-500 text-white hover-lift shadow-soft"
							}`}
						>
							{isLoading ? (
								<>
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
									<span>Регистрация...</span>
								</>
							) : (
								<>
									<span>🚀</span>
									<span>Создать аккаунт</span>
								</>
							)}
						</button>
					</form>
					<div className="text-center mt-6">
						<p className="text-gray-600">
							Уже есть аккаунт?{" "}
							<Link
								href="/login"
								className="text-blue-600 font-semibold hover:text-blue-700"
							>
								Войти
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
