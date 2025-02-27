document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const saveButton = document.getElementById("saveButton");
    const output = document.getElementById("output");
    const savedNotes = document.getElementById("savedNotes");
    let talking = false;
    let saveNote = "";

    if (!("webkitSpeechRecognition" in window)) {
        output.textContent = "Seu navegador não suporta reconhecimento de voz.";
        return;
    };

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "pt-BR";

    startButton.addEventListener("click", () => {
        if (!talking) {
            output.textContent = "Ouvindo...";
            recognition.start();
            talking = true;
        } else {
            alert("A gravação já foi iniciada");
        }
    });

    stopButton.addEventListener("click", () => {
        if (talking) {
            recognition.stop();
            talking = false;
            alert("A gravação foi finalizada");
            saveNote = output.textContent;
        } else {
            alert("A gravação não foi iniciada.");
        }
    });

    saveButton.addEventListener("click", () => {
        if (talking) {
            alert("A gravação precisa ser finalizada para salvar a nota")
            return
        }
        else if (saveNote.trim() === "") {
            alert("Não há nenhuma nota para salvar.");
            return;
        }

        const noteContainer = document.createElement("div");
        noteContainer.classList.add("note");

        const noteTextArea = document.createElement("textarea");
        noteTextArea.value = saveNote;
        noteTextArea.rows = 4;
        noteTextArea.cols = 50;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", () => {
            savedNotes.removeChild(noteContainer);
        });

        noteContainer.appendChild(noteTextArea);
        noteContainer.appendChild(deleteButton);
        savedNotes.appendChild(noteContainer);

        saveNote = "";
        output.textContent = "Sua transcrição aparecerá aqui...";
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
        talking = false;
        saveNote = "";
    };
});
