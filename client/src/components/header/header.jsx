import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const catalogRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (catalogRef.current && !catalogRef.current.contains(e.target)) {
        setCatalogOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LOGO + MARCA */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="logo"
            className="w-14 h-14 object-cover rounded-full shadow-sm"
          />
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-semibold text-gray-800 tracking-tight"
          >
            Forniture & Sofa
          </motion.h1>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <Link to="/" className="hover:text-black transition">Home</Link>

          {/* Dropdown por CLICK */}
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
                  className="absolute left-0 mt-3 w-[240px] bg-white shadow-xl rounded-xl border border-gray-100 p-4 grid gap-3"
                >
                  <Link to="/catalogo/sofas" className="hover:text-black">Sofás Premium</Link>
                  <Link to="/catalogo/sillas" className="hover:text-black">Sillas Modernas</Link>
                  <Link to="/catalogo/mesas" className="hover:text-black">Mesas Elegantes</Link>
                  <Link to="/catalogo/armarios" className="hover:text-black">Armarios</Link>
                  <Link to="/catalogo/decoracion" className="hover:text-black">Decoración</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/nosotros" className="hover:text-black transition">Nosotros</Link>
          <Link to="/contacto" className="hover:text-black transition">Contacto</Link>
        </nav>

        {/* BOTÓN MENU MOBILE */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-xl px-6 py-4"
          >
            <ul className="flex flex-col gap-4 text-gray-700 font-medium">

              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

              {/* Dropdown mobile */}
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
                      <Link to="/catalogo/sofas">Sofás Premium</Link>
                      <Link to="/catalogo/sillas">Sillas Modernas</Link>
                      <Link to="/catalogo/mesas">Mesas Elegantes</Link>
                      <Link to="/catalogo/armarios">Armarios</Link>
                      <Link to="/catalogo/decoracion">Decoración</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/nosotros" onClick={() => setMenuOpen(false)}>
                Nosotros
              </Link>
              <Link to="/contacto" onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
