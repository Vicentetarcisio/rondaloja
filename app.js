// Elementos HTML
let timerElement = document.getElementById("timer");
let statusElement = document.getElementById("status");
let intervalId = null;
let countdownTime = 10; // Tempo inicial da contagem regressiva

// Função para gerar um QR code
document.getElementById("generateBtn").addEventListener("click", () => {
    const qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = ""; // Limpa QR codes anteriores

    const qrCode = new QRCode(qrcodeContainer, {
        text: "Ponto de Ronda",
        width: 128,
        height: 128
    });
});

// Função para iniciar a contagem regressiva
function startCountdown() {
    let currentTime = countdownTime;
    timerElement.style.color = "green";
    timerElement.innerText = currentTime;

    if (intervalId) clearInterval(intervalId); // Limpa contagem anterior

    intervalId = setInterval(() => {
        currentTime--;
        if (currentTime >= 0) {
            timerElement.innerText = currentTime;
            timerElement.style.color = currentTime <= 3 ? "red" : currentTime <= 6 ? "yellow" : "green";
        } else {
            clearInterval(intervalId);
            statusElement.innerText = "Tempo encerrado!";
        }
    }, 1000);
}

// Função chamada ao escanear um QR Code com sucesso
function onQRCodeScanned(decodedText) {
    console.log(`QR Code escaneado: ${decodedText}`);
    statusElement.innerText = "QR Code lido com sucesso! Iniciando contagem...";
    startCountdown();
}

// Função para configurar e iniciar o scanner de QR code
function startQRScanner() {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start(
        { facingMode: "environment" }, // Usa a câmera traseira
        config,
        onQRCodeScanned // Callback para leitura de QR Code
    ).then(() => {
        statusElement.innerText = "Aponte a câmera para o QR code.";
    }).catch(err => {
        statusElement.innerText = "Erro ao acessar a câmera.";
        console.error("Erro ao iniciar o escaneamento de QR Code", err);
    });
}

// Inicia o scanner ao carregar a página
document.addEventListener("DOMContentLoaded", startQRScanner);
