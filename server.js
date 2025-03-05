const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3000;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database("notes.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
        db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, content TEXT)");
    }
});

app.use(express.json());
app.use(cors());

// Rota para salvar uma nota
app.post("/save", (req, res) => {
    const { content } = req.body;
    db.run("INSERT INTO notes (content) VALUES (?)", [content], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, content });
    });
});

// Rota para obter todas as notas
app.get("/notes", (req, res) => {
    db.all("SELECT * FROM notes", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Rota para excluir uma nota
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM notes WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Nota excluída com sucesso!" });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
