document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const output = document.getElementById("output");

    // Verifica se o navegador suporta a API de reconhecimento de voz
    if (!("webkitSpeechRecognition" in window)) {
        output.textContent = "Seu navegador não suporta reconhecimento de voz.";
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;  // Para após detectar uma pausa
    recognition.interimResults = true;  // Mostra resultados parciais
    recognition.lang = "pt-BR";  // Define o idioma

    startButton.addEventListener("click", () => {
        output.textContent = "Ouvindo...";
        recognition.start();
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

    recognition.onend = () => {
        output.textContent += " (Finalizado)";
    };
});
