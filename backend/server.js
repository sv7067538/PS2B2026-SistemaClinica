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
   ADMIN
========================= */

// DASHBOARD ADMIN
app.get("/admin/dashboard", (req, res) => {

  const dashboard = {};

  db.query(
    "SELECT COUNT(*) AS total_pacientes FROM paciente",
    (err, pacientes) => {

      if (err) {
        return res.status(500).json({ error: "Error pacientes" });
      }

      dashboard.pacientes = pacientes[0].total_pacientes;

      db.query(
        "SELECT COUNT(*) AS total_medicos FROM personal_medico",
        (err, medicos) => {

          if (err) {
            return res.status(500).json({ error: "Error médicos" });
          }

          dashboard.medicos = medicos[0].total_medicos;

          db.query(
            "SELECT COUNT(*) AS total_citas FROM citas",
            (err, citas) => {

              if (err) {
                return res.status(500).json({ error: "Error citas" });
              }

              dashboard.citas = citas[0].total_citas;

              db.query(
                "SELECT COUNT(*) AS total_historiales FROM historial_clinico",
                (err, historial) => {

                  if (err) {
                    return res.status(500).json({ error: "Error historial" });
                  }

                  dashboard.historiales = historial[0].total_historiales;

                  res.json(dashboard);
                }
              );
            }
          );
        }
      );
    }
  );
});


/* =========================
   GESTIÓN DE PACIENTES
========================= */

// obtener todos los pacientes
app.get("/admin/pacientes", (req, res) => {

  db.query(
    "SELECT * FROM paciente",
    (err, result) => {

      if (err) {
        return res.status(500).json({ error: "Error servidor" });
      }

      res.json(result);
    }
  );
});

// eliminar paciente
app.delete("/admin/pacientes/:id", (req, res) => {

  db.query(
    "DELETE FROM paciente WHERE id_paciente = ?",
    [req.params.id],
    (err) => {

      if (err) {
        return res.status(500).json({ error: "Error al eliminar paciente" });
      }

      res.json({ message: "Paciente eliminado" });
    }
  );
});


/* =========================
   GESTIÓN DE PERSONAL MÉDICO
========================= */

// obtener médicos
app.get("/admin/medicos", (req, res) => {

  db.query(
    `SELECT pm.*, e.nombre AS especialidad
     FROM personal_medico pm
     LEFT JOIN especialidad e
     ON pm.id_especialidad = e.id_especialidad`,
    (err, result) => {

      if (err) {
        return res.status(500).json({ error: "Error servidor" });
      }

      res.json(result);
    }
  );
});

// crear médico
app.post("/admin/medicos", (req, res) => {

  const {
    nombre,
    apellido,
    telefono,
    email,
    cargo,
    id_especialidad,
    id_clinica
  } = req.body;

  db.query(
    `INSERT INTO personal_medico
    (nombre, apellido, telefono, email, cargo, id_especialidad, id_clinica)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      nombre,
      apellido,
      telefono,
      email,
      cargo,
      id_especialidad,
      id_clinica
    ],
    (err) => {

      if (err) {
        return res.status(500).json({ error: "Error al crear médico" });
      }

      res.json({ message: "Médico creado correctamente" });
    }
  );
});

// eliminar médico
app.delete("/admin/medicos/:id", (req, res) => {

  db.query(
    "DELETE FROM personal_medico WHERE id_medico = ?",
    [req.params.id],
    (err) => {

      if (err) {
        return res.status(500).json({ error: "Error al eliminar médico" });
      }

      res.json({ message: "Médico eliminado" });
    }
  );
});


/* =========================
   GESTIÓN DE CITAS
========================= */

// obtener todas las citas
app.get("/admin/citas", (req, res) => {

  db.query(
    `SELECT c.*,
            p.nombre AS paciente_nombre,
            p.apellido AS paciente_apellido,
            m.nombre AS medico_nombre,
            m.apellido AS medico_apellido
     FROM citas c
     JOIN paciente p
     ON c.id_paciente = p.id_paciente
     JOIN personal_medico m
     ON c.id_medico = m.id_medico`,
    (err, result) => {

      if (err) {
        return res.status(500).json({ error: "Error servidor" });
      }

      res.json(result);
    }
  );
});

// eliminar cita
app.delete("/admin/citas/:id", (req, res) => {

  db.query(
    "DELETE FROM citas WHERE id_cita = ?",
    [req.params.id],
    (err) => {

      if (err) {
        return res.status(500).json({ error: "Error al eliminar cita" });
      }

      res.json({ message: "Cita eliminada" });
    }
  );
});


/* =========================
   HISTORIAL CLÍNICO ADMIN
========================= */

// obtener todos los historiales
app.get("/admin/historial", (req, res) => {

  db.query(
    `SELECT h.*,
            p.nombre AS paciente_nombre,
            p.apellido AS paciente_apellido,
            m.nombre AS medico_nombre,
            m.apellido AS medico_apellido
     FROM historial_clinico h
     JOIN paciente p
     ON h.id_paciente = p.id_paciente
     JOIN personal_medico m
     ON h.id_medico = m.id_medico`,
    (err, result) => {

      if (err) {
        return res.status(500).json({ error: "Error servidor" });
      }

      res.json(result);
    }
  );
});


/* =========================
   DATOS CLÍNICA
========================= */

// obtener clínicas
app.get("/admin/clinicas", (req, res) => {

  db.query(
    "SELECT * FROM clinica",
    (err, result) => {

      if (err) {
        return res.status(500).json({ error: "Error servidor" });
      }

      res.json(result);
    }
  );
});

// actualizar clínica
app.put("/admin/clinicas/:id", (req, res) => {

  const { nombre, direccion } = req.body;

  db.query(
    "UPDATE clinica SET nombre=?, direccion=? WHERE id_clinica=?",
    [nombre, direccion, req.params.id],
    (err) => {

      if (err) {
        return res.status(500).json({ error: "Error al actualizar clínica" });
      }

      res.json({ message: "Clínica actualizada" });
    }
  );
});

/* =========================
   EDITAR PACIENTE ADMIN
========================= */

app.put("/admin/pacientes/:id", (req, res) => {

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
    alergias
  } = req.body;

  db.query(
    `UPDATE paciente
     SET nombre=?,
         apellido=?,
         ci=?,
         telefono=?,
         direccion=?,
         email=?,
         genero=?,
         fecha_nacimiento=?,
         tipo_sangre=?,
         alergias=?
     WHERE id_paciente=?`,
    [
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
      req.params.id
    ],
    (err) => {

      if (err) {
        return res.status(500).json({
          error: "Error al actualizar paciente"
        });
      }

      res.json({
        message: "Paciente actualizado correctamente"
      });
    }
  );
});


/* =========================
   EDITAR MÉDICO ADMIN
========================= */

app.put("/admin/medicos/:id", (req, res) => {

  const {
    nombre,
    apellido,
    telefono,
    email,
    cargo,
    id_especialidad,
    id_clinica
  } = req.body;

  db.query(
    `UPDATE personal_medico
     SET nombre=?,
         apellido=?,
         telefono=?,
         email=?,
         cargo=?,
         id_especialidad=?,
         id_clinica=?
     WHERE id_medico=?`,
    [
      nombre,
      apellido,
      telefono,
      email,
      cargo,
      id_especialidad,
      id_clinica,
      req.params.id
    ],
    (err) => {

      if (err) {
        return res.status(500).json({
          error: "Error al actualizar médico"
        });
      }

      res.json({
        message: "Médico actualizado correctamente"
      });
    }
  );
});


/* =========================
   EDITAR CITA ADMIN
========================= */

app.put("/admin/citas/:id", (req, res) => {

  const {
    fecha,
    hora,
    estado,
    motivo
  } = req.body;

  db.query(
    `UPDATE citas
     SET fecha=?,
         hora=?,
         estado=?,
         motivo=?
     WHERE id_cita=?`,
    [
      fecha,
      hora,
      estado,
      motivo,
      req.params.id
    ],
    (err) => {

      if (err) {
        return res.status(500).json({
          error: "Error al actualizar cita"
        });
      }

      res.json({
        message: "Cita actualizada correctamente"
      });
    }
  );
});


/* =========================
   EDITAR HISTORIAL ADMIN
========================= */

app.put("/admin/historial/:id", (req, res) => {

  const {
    diagnostico,
    tratamiento,
    observaciones,
    motivo_consulta
  } = req.body;

  db.query(
    `UPDATE historial_clinico
     SET diagnostico=?,
         tratamiento=?,
         observaciones=?,
         motivo_consulta=?
     WHERE id_historial=?`,
    [
      diagnostico,
      tratamiento,
      observaciones,
      motivo_consulta,
      req.params.id
    ],
    (err) => {

      if (err) {
        return res.status(500).json({
          error: "Error al actualizar historial"
        });
      }

      res.json({
        message: "Historial actualizado correctamente"
      });
    }
  );
});
/* =========================
   SERVER
========================= */
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});