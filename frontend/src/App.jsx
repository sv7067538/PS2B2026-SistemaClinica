import { useRef } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import Footer from "./components/Footer";

function App() {
  const serviciosRef = useRef(null);

  const scrollToServicios = () => {
    serviciosRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
  return (
    <>
      <Navbar onServiciosClick={scrollToServicios}/>
      <Hero />
      <Servicios ref={serviciosRef}/>
      <Footer />
    </>
    
  );
}

export default App;