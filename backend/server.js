const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", (req, res) => {
  const { nombre, email, password } = req.body;

  // VALIDACIONES
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Campos obligatorios" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Mínimo 6 caracteres" });
  }

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ error: "Email ya existe" });
    }

    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, hash, "paciente"],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Error servidor" });

        res.json({ message: "Usuario registrado correctamente" });
      }
    );
  });
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});