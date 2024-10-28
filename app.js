let rondaIniciada = false;
let countdownInterval; // Variável para armazenar o intervalo de contagem regressiva

// Função de contagem regressiva ajustável com cores
function startCountdownWithColor(seconds) {
    let timeLeft = seconds;
    let timerElement = document.getElementById('timer');
    timerElement.style.fontSize = "100px"; // Tamanho grande
    timerElement.style.fontWeight = "bold"; // Texto em negrito
    timerElement.style.color = "green"; // Cor inicial

    clearInterval(countdownInterval); // Limpa qualquer contagem anterior

    countdownInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            timerElement.textContent = "Tempo esgotado!";
            timerElement.style.color = "red"; // Muda para vermelho ao terminar
            alert("Tempo esgotado!"); // Mostra alerta ao fim da contagem
            addLog("Tempo esgotado após escanear o QR Code.");
        } else {
            timerElement.textContent = `${timeLeft}s`;

            // Mudar as cores conforme o tempo restante
            if (timeLeft <= seconds / 3) {
                timerElement.style.color = "red"; // Última fase: vermelho
            } else if (timeLeft <= (2 * seconds) / 3) {
                timerElement.style.color = "yellow"; // Fase intermediária: amarelo
            } else {
                timerElement.style.color = "green"; // Fase inicial: verde
            }
        }
        timeLeft -= 1;
    }, 1000);
}

// Função para escanear QR Code usando ZXing
document.getElementById('startScan').addEventListener('click', function() {
    let video = document.getElementById('preview');
    
    const scanner = new ZXing.BrowserQRCodeReader();
    scanner.decodeFromVideoDevice(null, 'preview', (result, err) => {
        if (result) {
            if (!rondaIniciada) {
                // Quando o primeiro QR Code é escaneado
                rondaIniciada = true;
                alert("Início da Ronda!");
                addLog("Início da Ronda!");
            }

            // Mostra o QR Code escaneado e inicia a contagem
            alert(`QR Code escaneado: ${result.text}`);
            addLog(`QR Code escaneado: ${result.text}`);

            // Reiniciar a contagem de 10 segundos com cores
            startCountdownWithColor(10);

            scanner.reset(); // Reinicia o scanner para uma nova leitura
        } else if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
        }
    });
});

// Funções de geração e impressão de QR Code
document.getElementById('generateQR').addEventListener('click', function() {
    let qrText = document.getElementById('qrText').value;
    let qrTime = document.getElementById('qrTime').value;
    let qrcodeDiv = document.createElement('div');
    let qrContainer = document.createElement('div');
    qrContainer.style.display = "inline-block";
    qrContainer.style.margin = "10px";
    qrcodeDiv.style.border = "1px solid black";
    qrContainer.appendChild(qrcodeDiv);

    // Gerar QR Code
    let qrcode = new QRCode(qrcodeDiv, {
        text: qrText,
        width: 128,
        height: 128
    });

    let printButton = document.createElement('button');
    printButton.innerText = "Imprimir QR Code";
    printButton.onclick = function() {
        let win = window.open();
        win.document.write(qrcodeDiv.innerHTML);
        win.print();
        win.close();
    };

    qrContainer.appendChild(printButton);
    document.getElementById('qrcodeList').appendChild(qrContainer);
});

// Função para adicionar logs
function addLog(message) {
    let logs = document.getElementById('logs');
    logs.value += message + '\n';
}
