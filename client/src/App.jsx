import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Catalogo from "./pages/catalogo";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
    </>
  );
}

export default App;
