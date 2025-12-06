import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const catalogRef = useRef(null);
  const navigate = useNavigate();

  // Ir a contacto en Home
  const goToContacto = () => {
    navigate("/");
    setTimeout(() => {
      const target = document.getElementById("contacto");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // Cerrar dropdown al click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catalogRef.current && !catalogRef.current.contains(e.target)) {
        setCatalogOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="logo"
            className="w-14 h-14 object-cover rounded-full shadow-sm"
          />
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
            Forniture & Sofa
          </h1>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>
          <button
            onClick={goToContacto}
            className="hover:text-black transition"
          >
            Contacto
          </button>

          {/* CATALOGO */}
          <div className="relative" ref={catalogRef}>
            <button
              onClick={() => setCatalogOpen(!catalogOpen)}
              className="flex items-center gap-1 hover:text-black transition"
            >
              Catálogo <ChevronDown size={18} />
            </button>

            <AnimatePresence>
              {catalogOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 mt-3 w-[220px] bg-white shadow-xl rounded-xl border border-gray-100 p-4 grid gap-3"
                >
                  <Link className="hover:text-black" to="/catalogo/sofas">
                    Sofás
                  </Link>
                  <Link className="hover:text-black" to="/catalogo/sillas">
                    Sillas
                  </Link>
                  <Link className="hover:text-black" to="/catalogo/mesas">
                    Mesas
                  </Link>
                  <Link className="hover:text-black" to="/catalogo/armarios">
                    Armarios
                  </Link>
                  <Link className="hover:text-black" to="/catalogo/decoracion">
                    Decoración
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* BOTÓN MOBILE */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* SIDEBAR MOBILE DESDE LA DERECHA */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Fondo borroso */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* PANEL DESLIZANTE */}
            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[75%] max-w-[320px] bg-white shadow-xl z-50 p-6 flex flex-col gap-6"
            >
              {/* Cerrar */}
              <button
                className="self-end mb-4 text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                <X size={28} />
              </button>

              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  goToContacto();
                }}
                className="text-left"
              >
                Contacto
              </button>

              {/* CATALOGO */}
              <div>
                <button
                  onClick={() => setCatalogOpen(!catalogOpen)}
                  className="flex items-center justify-between w-full"
                >
                  Catálogo <ChevronDown size={18} />
                </button>

                <AnimatePresence>
                  {catalogOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="ml-3 mt-2 flex flex-col gap-3"
                    >
                      <Link to="/catalogo/sofas">Sofás</Link>
                      <Link to="/catalogo/sillas">Sillas</Link>
                      <Link to="/catalogo/mesas">Mesas</Link>
                      <Link to="/catalogo/armarios">Armarios</Link>
                      <Link to="/catalogo/decoracion">Decoración</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
