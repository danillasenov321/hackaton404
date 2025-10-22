const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");

const app = express();
const port = 3000;

const privateKey = fs.readFileSync(path.join(__dirname, "key.pem"), "utf8");
const certificate = fs.readFileSync(path.join(__dirname, "cert.pem"), "utf8");

const credentials = { key: privateKey, cert: certificate };

// Обслуживаем статические файлы из папки public
// Обслуживаем статические файлы из папки public
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Запуск HTTPS сервера
https.createServer(credentials, app).listen(port, () => {
	console.log(`Server is running at https://localhost:${port}`);
});
