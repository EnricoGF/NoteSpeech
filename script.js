document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const output = document.getElementById("output");
    let talking = false

    // Verifica se o navegador suporta a API de reconhecimento de voz
    if (!("webkitSpeechRecognition" in window)) {
        output.textContent = "Seu navegador não suporta reconhecimento de voz.";
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;  // Não para após detectar uma pausa
    recognition.interimResults = true;  // Mostra resultados parciais
    recognition.lang = "pt-BR";  // Define o idioma

    startButton.addEventListener("click", () => {
        if (talking == false) {
            output.textContent = "Ouvindo...";
            recognition.start();
            talking = true
        }
        else {
            alert("A gravação já foi iniciada")
        }
    });

    stopButton.addEventListener("click", () => {
        if (talking == true) {
            output.textContent += " (Finalizado)";
            recognition.stop();
            talking = false
        }
        else {
            alert("A gravação não foi iniciada.")
        }
    });

    recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        output.textContent = transcript;
    };

    recognition.onerror = (event) => {
        output.textContent = "Erro ao reconhecer voz: " + event.error;
    };
});