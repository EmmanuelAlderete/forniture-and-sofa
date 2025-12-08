import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Catalogo from "./pages/catalogo";
import ProductoDetalle from "./pages/producto";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
      </Routes>
    </>
  );
}

export default App;
