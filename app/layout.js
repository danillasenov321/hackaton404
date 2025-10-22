import "../styles/globals.css";

export const metadata = {
	title: "Мое PWA",
	description: "Описание",
	manifest: "/manifest.json", // Путь к манифесту
	icons: [
		{
			rel: "icon",
			href: "/icons/icon-192x192.png",
			sizes: "192x192"
		},
		{
			rel: "icon",
			href: "/icons/icon-512x512.png",
			sizes: "512x512"
		}
	]
};

export default function RootLayout({ children }) {
	return (
		<html lang="ru">
			<head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#2b2b2b" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
				<meta name="apple-mobile-web-app-title" content="Мое PWA" />
				<link rel="icon" href="/icons/icon-192x192.png" sizes="192x192" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta
					name="msapplication-TileImage"
					content="/icons/icon-192x192.png"
				/>
				<meta name="msapplication-TileColor" content="#2b2b2b" />
			</head>
			<body>{children}</body>
		</html>
	);
}
