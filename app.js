let countdownTime = 10; // Tempo inicial da contagem regressiva em segundos
let timerElement = document.getElementById("timer");
let intervalId = null;
let countingDown = false;

// Função para iniciar a contagem regressiva
function startCountdown() {
    let currentTime = countdownTime;
    timerElement.style.color = "green";
    timerElement.innerText = currentTime;

    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
        currentTime--;

        // Mudança de cor conforme o tempo
        if (currentTime > 0) {
            timerElement.innerText = currentTime;
            if (currentTime <= 3) {
                timerElement.style.color = "red";
            } else if (currentTime <= 6) {
                timerElement.style.color = "yellow";
            }
        } else {
            timerElement.innerText = currentTime;
            timerElement.style.color = "red";
            if (currentTime < 0) {
                timerElement.innerText = `${currentTime} (Atraso)`;
            }
        }
    }, 1000);
}

// Função chamada ao escanear um QR Code com sucesso
function onQRCodeScanned(decodedText) {
    console.log(`QR Code escaneado: ${decodedText}`);

    // Iniciar a contagem regressiva no primeiro escaneamento ou reiniciar em cada escaneamento
    if (!countingDown) {
        countingDown = true;
        startCountdown();
    } else {
        // Reiniciar a contagem para o próximo QR Code
        startCountdown();
    }
}

// Configurar o scanner HTML5 QR Code
function startQRScanner() {
    const html5QrCode = new Html5Qrcode("reader"); // Div onde a câmera será exibida
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start(
        { facingMode: "environment" }, // Usa a câmera traseira para dispositivos móveis
        config,
        onQRCodeScanned
    ).catch(err => {
        console.error("Erro ao iniciar o escaneamento de QR Code", err);
    });
}

// Iniciar o scanner ao carregar a página
document.addEventListener("DOMContentLoaded", startQRScanner);
