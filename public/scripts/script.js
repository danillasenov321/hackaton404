let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", event => {
	console.log("beforeinstallprompt event сработало"); // Логирование для дебага

	// Предотвращаем появление стандартного предложения от браузера
	event.preventDefault();
	deferredPrompt = event;

	// Показать кнопку
	installBtn.style.display = "block";
	console.log("Кнопка установки показана");

	// Просить пользователя установить приложение
	installBtn.addEventListener("click", () => {
		console.log("Кнопка установки нажата");
		deferredPrompt.prompt();

		deferredPrompt.userChoice.then(choiceResult => {
			if (choiceResult.outcome === "accepted") {
				console.log("Пользователь установил PWA");
			} else {
				console.log("Пользователь отклонил установку");
			}
			deferredPrompt = null;
		});
	});
});

// Зарегистрировать сервис-воркер
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/sw.js")
			.then(registration => {
				console.log(
					"Service Worker зарегистрирован с областью:",
					registration.scope
				);
			})
			.catch(error => {
				console.log("Ошибка при регистрации Service Worker:", error);
			});
	});
}
