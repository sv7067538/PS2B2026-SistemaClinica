import { useState } from "react";
import Signup from "./Signup";
import Paciente from "./pages/Paciente";
import CrearCita from "./pages/CrearCita";
import MisCitas from "./pages/MisCitas";

function App() {
  const [vista, setVista] = useState("signup");

  return (
    <div>
      {vista === "signup" && <Signup />}

      {vista === "paciente" && <Paciente />}

      {vista === "citas" && (
        <>
          <CrearCita />
          <MisCitas />
        </>
      )}

      {/* BOTONES DE PRUEBA */}
     <div style={{ marginTop: "20px" }}>
  <button style={{ width: "120px", marginRight: "10px" }} onClick={() => setVista("signup")}>
    Signup
  </button>

  <button style={{ width: "120px", marginRight: "10px" }} onClick={() => setVista("paciente")}>
    Paciente
  </button>

  <button style={{ width: "120px" }} onClick={() => setVista("citas")}>
    Citas
  </button>
</div>
    </div>
  );
}

export default App;