export const metadata = {
	title: "Мое PWA",
	description: "Описание",
	manifest: "/manifest.json"
};

export default function RootLayout({ children }) {
	return (
		<html lang="ru">
			<body>{children}</body>
		</html>
	);
}
