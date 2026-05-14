const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   AUTH
========================= */
app.post("/auth/signup", (req, res) => {
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
        "INSERT INTO usuarios (nombre_usuario, contrasena, rol, email) VALUES (?, ?, ?, ?)",
        [nombre_usuario, hash, "paciente", email],
        (err) => {
          if (err) return res.status(500).json({ error: "Error servidor" });

          res.json({ message: "Usuario registrado correctamente" });
        }
      );
    }
  );
});

/* =========================
   PACIENTES
========================= */

// crear paciente
app.post("/pacientes", (req, res) => {
  const {
    nombre, apellido, ci, telefono, direccion,
    email, genero, fecha_nacimiento, tipo_sangre,
    alergias, id_usuario
  } = req.body;

  db.query(
    "INSERT INTO paciente (nombre, apellido, ci, telefono, direccion, email, genero, fecha_nacimiento, tipo_sangre, alergias, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [nombre, apellido, ci, telefono, direccion, email, genero, fecha_nacimiento, tipo_sangre, alergias, id_usuario],
    (err) => {
      if (err) return res.status(500).json({ error: "Error al crear paciente" });

      res.json({ message: "Paciente creado correctamente" });
    }
  );
});

// obtener paciente por usuario
app.get("/pacientes/usuario/:id_usuario", (req, res) => {
  db.query(
    "SELECT * FROM paciente WHERE id_usuario = ?",
    [req.params.id_usuario],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });
      res.json(result[0] || null);
    }
  );
});

// actualizar paciente
app.put("/pacientes/:id", (req, res) => {
  const { telefono, direccion, email, tipo_sangre, alergias } = req.body;

  db.query(
    "UPDATE paciente SET telefono=?, direccion=?, email=?, tipo_sangre=?, alergias=? WHERE id_paciente=?",
    [telefono, direccion, email, tipo_sangre, alergias, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Error al actualizar paciente" });

      res.json({ message: "Paciente actualizado" });
    }
  );
});

/* =========================
   CITAS
========================= */

// crear cita
app.post("/citas", (req, res) => {
  const { id_paciente, id_medico, fecha, hora, motivo } = req.body;

  db.query(
    "INSERT INTO citas (id_paciente, id_medico, fecha, hora, estado, motivo) VALUES (?, ?, ?, ?, 'Pendiente', ?)",
    [id_paciente, id_medico, fecha, hora, motivo],
    (err) => {
      if (err) return res.status(500).json({ error: "Error al crear cita" });

      res.json({ message: "Cita creada correctamente" });
    }
  );
});

// obtener citas paciente
app.get("/citas/paciente/:id", (req, res) => {
  db.query(
    "SELECT * FROM citas WHERE id_paciente = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });
      res.json(result);
    }
  );
});

// cancelar cita
app.put("/citas/:id/cancelar", (req, res) => {
  db.query(
    "UPDATE citas SET estado='Cancelada' WHERE id_cita=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      res.json({ message: "Cita cancelada" });
    }
  );
});

// confirmar cita
app.put("/citas/:id/confirmar", (req, res) => {
  db.query(
    "UPDATE citas SET estado='Confirmada' WHERE id_cita=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      res.json({ message: "Cita confirmada" });
    }
  );
});

// completar cita
app.put("/citas/:id/completar", (req, res) => {
  db.query(
    "UPDATE citas SET estado='Completada' WHERE id_cita=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      res.json({ message: "Cita completada" });
    }
  );
});

// citas del médico
app.get("/medico/:id/citas", (req, res) => {
  db.query(
    `SELECT c.*, p.nombre AS paciente_nombre, p.apellido
     FROM citas c
     JOIN paciente p ON c.id_paciente = p.id_paciente
     WHERE c.id_medico = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      res.json(result);
    }
  );
});

/* =========================
   HISTORIAL
========================= */

// crear historial
app.post("/historial", (req, res) => {
  const { id_paciente, id_medico, diagnostico, tratamiento, observaciones, motivo_consulta } = req.body;

  db.query(
    `INSERT INTO historial_clinico 
    (id_paciente, id_medico, diagnostico, tratamiento, observaciones, motivo_consulta)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [id_paciente, id_medico, diagnostico, tratamiento, observaciones, motivo_consulta],
    (err) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      res.json({ message: "Historial creado" });
    }
  );
});

// historial por paciente
app.get("/historial/paciente/:id", (req, res) => {
  db.query(
    `SELECT h.*, m.nombre AS medico_nombre, m.apellido AS medico_apellido
     FROM historial_clinico h
     JOIN personal_medico m ON h.id_medico = m.id_medico
     WHERE h.id_paciente = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });

      res.json(result);
    }
  );
});



app.get("/medico/:id/pacientes", (req, res) => {
  db.query(
    `SELECT DISTINCT p.id_paciente, p.nombre, p.apellido, p.ci
     FROM paciente p
     JOIN citas c ON p.id_paciente = c.id_paciente
     WHERE c.id_medico = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });
      res.json(result);
    }
  );
});


app.get("/citas/medico/:id", (req, res) => {
  db.query(
    `SELECT c.*, p.nombre AS paciente_nombre, p.apellido
     FROM citas c
     JOIN paciente p ON c.id_paciente = p.id_paciente
     WHERE c.id_medico = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error servidor" });
      res.json(result);
    }
  );
});
/* =========================
   SERVER
========================= */
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});