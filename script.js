let countdown;
let countdownTimer;

$('#generate').click(function() {
    const location = $('#location').val();
    $('#qrcode').empty();
    $('#qrcode').qrcode(location);
});

$('#start-scan').click(function() {
    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" }, 
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        qrCodeMessage => {
            console.log(`QR Code escaneado: ${qrCodeMessage}`);
            clearInterval(countdownTimer);
            startCountdown(10); // Inicia contagem de 10 segundos
            // Aqui você pode adicionar lógica para registrar o QR Code escaneado
        },
        errorMessage => {
            // Trata erros de escaneamento
        })
        .catch(err => {
            console.error(err);
        });
});

function startCountdown(seconds) {
    let timeLeft = seconds;
    $('#timer').text(formatTime(timeLeft));

    countdownTimer = setInterval(() => {
        timeLeft--;
        $('#timer').text(formatTime(timeLeft));

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            alert('Tempo esgotado! Você não escaneou o próximo QR Code a tempo.');
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
