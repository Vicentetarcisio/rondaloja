let countdownTime = 10; // Tempo inicial da contagem regressiva em segundos
let timerElement = document.getElementById("timer");
let statusElement = document.getElementById("status");
let intervalId = null;

// Função para iniciar a contagem regressiva
function startCountdown() {
    let currentTime = countdownTime;
    timerElement.style.color = "green";
    timerElement.innerText = currentTime;

    if (intervalId) clearInterval(intervalId); // Limpa a contagem anterior para evitar múltiplos intervalos

    intervalId = setInterval(() => {
        currentTime--;

        // Mudança de cor conforme o tempo decresce
        if (currentTime >= 0) {
            timerElement.innerText = currentTime;
            timerElement.style.color = currentTime <= 3 ? "red" : currentTime <= 6 ? "yellow" : "green";
        } else {
            // Exibe o aviso de atraso se a contagem chegar a zero
            timerElement.innerText = `${currentTime} (Atraso)`;
            timerElement.style.color = "red";
        }
    }, 1000);
}

// Função chamada ao escanear um QR Code com sucesso
function onQRCodeScanned(decodedText) {
    console.log(`QR Code escaneado: ${decodedText}`);
    statusElement.innerText = "QR Code lido com sucesso! Iniciando contagem...";

    startCountdown(); // Inicia a contagem regressiva após cada escaneamento
}

// Função para configurar e iniciar o scanner de QR code
function startQRScanner() {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 5, qrbox: { width: 250, height: 250 } }; // Configuração de fps baixo

    html5QrCode.start(
        { facingMode: "environment" }, // Usa a câmera traseira
        config,
        onQRCodeScanned // Callback ao escanear
    ).then(() => {
        statusElement.innerText = "Aponte a câmera para o QR code.";
    }).catch(err => {
        statusElement.innerText = "Erro ao acessar a câmera.";
        console.error("Erro ao iniciar o escaneamento de QR Code", err);
    });
}

// Inicia o scanner quando o conteúdo da página for carregado
document.addEventListener("DOMContentLoaded", startQRScanner);
