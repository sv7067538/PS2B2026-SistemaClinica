const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   SIGNUP
========================= */
app.post("/signup", (req, res) => {
  const { nombre_usuario, email, password } = req.body;

  if (!nombre_usuario || !password) {
    return res.status(400).json({ error: "Campos obligatorios" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Mínimo 6 caracteres" });
  }

  db.query(
    "SELECT * FROM usuarios WHERE nombre_usuario = ?",
    [nombre_usuario],
    async (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      if (result.length > 0) {
        return res.status(400).json({ error: "Usuario ya existe" });
      }

      const hash = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO usuarios (nombre, password, rol, email) VALUES (?, ?, ?, ?)",
        [nombre_usuario, hash, "paciente", email],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Error servidor" });

          res.json({ message: "Usuario registrado correctamente" });
        }
      );
    }
  );
});

/* =========================
   PACIENTE
========================= */
app.post("/paciente", (req, res) => {
  const {
    nombre,
    apellido,
    ci,
    telefono,
    direccion,
    email,
    genero,
    fecha_nacimiento,
    tipo_sangre,
    alergias,
    id_usuario
  } = req.body;

  if (!nombre || !apellido || !ci) {
    return res.status(400).json({ error: "Campos obligatorios" });
  }

  db.query(
    "SELECT * FROM paciente WHERE ci = ?",
    [ci],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      if (result.length > 0) {
        return res.status(400).json({ error: "CI ya registrado" });
      }

      db.query(
        "INSERT INTO paciente (nombre, apellido, ci, telefono, direccion, email, genero, fecha_nacimiento, tipo_sangre, alergias, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [nombre, apellido, ci, telefono, direccion, email, genero, fecha_nacimiento, tipo_sangre, alergias, id_usuario],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Error servidor" });

          res.json({ message: "Paciente creado correctamente" });
        }
      );
    }
  );
});

app.get("/paciente/:id_usuario", (req, res) => {
  const { id_usuario } = req.params;

  db.query(
    "SELECT * FROM paciente WHERE id_usuario = ?",
    [id_usuario],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      if (result.length === 0) {
        return res.status(404).json({ error: "Paciente no encontrado" });
      }

      res.json(result[0]);
    }
  );
});

app.put("/paciente/:id", (req, res) => {
  const { id } = req.params;
  const { telefono, direccion, email, tipo_sangre, alergias } = req.body;

  db.query(
    "UPDATE paciente SET telefono=?, direccion=?, email=?, tipo_sangre=?, alergias=? WHERE id_paciente=?",
    [telefono, direccion, email, tipo_sangre, alergias, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      res.json({ message: "Paciente actualizado" });
    }
  );
});

/* =========================
   CITAS
========================= */

// CREAR CITA
app.post("/citas", (req, res) => {
  const { id_paciente, id_medico, fecha, hora, motivo } = req.body;

  if (!id_paciente || !id_medico || !fecha || !hora) {
    return res.status(400).json({ error: "Campos obligatorios" });
  }

  db.query(
    "INSERT INTO citas (id_paciente, id_medico, fecha, hora, estado, motivo) VALUES (?, ?, ?, ?, 'Pendiente', ?)",
    [id_paciente, id_medico, fecha, hora, motivo],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      res.json({ message: "Cita creada correctamente" });
    }
  );
});

// OBTENER CITAS
app.get("/citas/:id_paciente", (req, res) => {
  const { id_paciente } = req.params;

  db.query(
    "SELECT * FROM citas WHERE id_paciente = ?",
    [id_paciente],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      res.json(result);
    }
  );
});

// CANCELAR CITA
app.put("/citas/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE citas SET estado='Cancelada' WHERE id_cita=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      res.json({ message: "Cita cancelada" });
    }
  );
});

/* =========================
   SERVER
========================= */
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});