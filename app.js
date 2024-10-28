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

// Função para simular o escaneamento do QR Code
function onQRCodeScanned() {
    // Iniciar a contagem regressiva no primeiro escaneamento
    if (!countingDown) {
        countingDown = true;
        startCountdown();
    } else {
        // Reiniciar a contagem para o próximo QR Code
        startCountdown();
    }
}

// Botão para simular o escaneamento de QR Code
document.getElementById("scanButton").addEventListener("click", onQRCodeScanned);
