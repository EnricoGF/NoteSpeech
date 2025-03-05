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

    saveButton.addEventListener("click", async () => {
        if (talking) {
            alert("A gravação precisa ser finalizada para salvar a nota")
            return;
        }
        else if (saveNote.trim() === "") {
            alert("Não há nenhuma nota para salvar.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content: saveNote })
            });
            const data = await response.json();
            displayNote(data.id, data.content);
        } catch (error) {
            console.error("Erro ao salvar nota:", error);
        }

        saveNote = "";
        output.textContent = "Sua transcrição aparecerá aqui...";
    });

    async function fetchNotes() {
        try {
            const response = await fetch("http://localhost:3000/notes");
            const notes = await response.json();
            savedNotes.innerHTML = "<h2>Notas Salvas</h2>";
            notes.forEach(note => displayNote(note.id, note.content));
        } catch (error) {
            console.error("Erro ao buscar notas:", error);
        }
    }

    function displayNote(id, content) {
        const noteContainer = document.createElement("div");
        noteContainer.classList.add("note");
        noteContainer.dataset.id = id;

        const noteTextArea = document.createElement("textarea");
        noteTextArea.value = content;
        noteTextArea.rows = 4;
        noteTextArea.cols = 50;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", async () => {
            try {
                await fetch(`http://localhost:3000/delete/${id}`, { method: "DELETE" });
                savedNotes.removeChild(noteContainer);
            } catch (error) {
                console.error("Erro ao excluir nota:", error);
            }
        });

        noteContainer.appendChild(noteTextArea);
        noteContainer.appendChild(deleteButton);
        savedNotes.appendChild(noteContainer);
    }

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

    fetchNotes();
});
