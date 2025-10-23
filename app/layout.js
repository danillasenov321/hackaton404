import "./globals.css";

export const metadata = {
	title: "ГидДНР - Туристический путеводитель",
	description: "Интерактивный гид по достопримечательностям ДНР",
	viewport:
		"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
};

export default function RootLayout({ children }) {
	return (
		<html lang="ru">
			<body className="min-h-screen bg-gray-50">
				<div className="flex flex-col min-h-screen">
					<main className="flex-1">{children}</main>
				</div>
			</body>
		</html>
	);
}
