
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Duvidas from "./Duvidas/Duvidas";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Calculadora from "./Calculadora/Calculadora";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />

       
        <Route path="/home" element={<Home />} />

    
        <Route path="/duvidas" element={<Duvidas />} />

        <Route path="/calculadora" element={<Calculadora />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;