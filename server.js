const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3000;

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

app.post("/save", (req, res) => {
    const { content } = req.body;
    db.run("INSERT INTO notes (content) VALUES (?)", [content], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, content });
    });
});

app.get("/notes", (req, res) => {
    db.all("SELECT * FROM notes", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM notes WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Nota excluída com sucesso!" });
    });
});

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    db.run("UPDATE notes SET content = ? WHERE id = ?", [content, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Nota atualizada com sucesso!" });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});