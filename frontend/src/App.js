import { useState } from "react";
import Signup from "./Signup";
import Paciente from "./pages/Paciente";
import CrearCita from "./pages/CrearCita";
import MisCitas from "./pages/MisCitas";
import MedicoDashboard from "./pages/MedicoDashboard";
import CrearHistorial from "./pages/CrearHistorial";

function App() {
  const [vista, setVista] = useState("signup");

  return (
    <div>
      {vista === "signup" && <Signup />}
      {vista === "historial" && <CrearHistorial />}

      {vista === "paciente" && <Paciente />}

      {vista === "citas" && (
        <>
          <CrearCita />
          <MisCitas />
        </>
      )}

      {vista === "medico" && <MedicoDashboard />}

      {/* BOTONES DE PRUEBA */}
      <div style={{ marginTop: "20px" }}>
        <button
          style={{ width: "120px", marginRight: "10px" }}
          onClick={() => setVista("signup")}
        >
          Signup
        </button>

        <button
          style={{ width: "120px", marginRight: "10px" }}
          onClick={() => setVista("paciente")}
        >
          Paciente
        </button>

        <button
          style={{ width: "120px", marginRight: "10px" }}
          onClick={() => setVista("citas")}
        >
          Citas
        </button>
        <button onClick={() => setVista("historial")}>
  Crear Historial
</button>

        {/* 🔥 NUEVO BOTÓN */}
        <button
          style={{ width: "120px" }}
          onClick={() => setVista("medico")}
        >
          Médico
        </button>
      </div>
    </div>
  );
}

export default App;