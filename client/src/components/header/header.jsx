import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiBox,
  FiHome,
  FiImage,
  FiTag,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import productos from "../../products/catalogo.json";
import { MdOutlineChair } from "react-icons/md";
import { RiArmchairFill, RiSofaLine } from "react-icons/ri";
import { FaChair } from "react-icons/fa6";
import { MdTableBar } from "react-icons/md";
import { PiDeskFill } from "react-icons/pi";
import { BsBookshelf } from "react-icons/bs";
import { GiTable } from "react-icons/gi";

export default function Header() {
  const [device, setDevice] = useState("desktop");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Se asume que productos.map y set son válidos
  const categorias = ["Todas", ...new Set(productos.map((p) => p.categoria))];

  // Cambio de color de íconos a un verde más oscuro
  const icons = {
    Todas: <FiBox className="w-4 h-4 text-green-700" />,
    Sofás: <RiSofaLine className="w-4 h-4 text-green-700" />,
    Sillas: <FaChair className="w-4 h-4 text-green-700" />,
    Butacas: <MdOutlineChair className="w-4 h-4 text-green-700" />,
    Sillones: <RiArmchairFill className="w-4 h-4 text-green-700" />,
    Mesas: <MdTableBar className="w-4 h-4 text-green-700" />,
    Decoración: <FiImage className="w-4 h-4 text-green-700" />,
    Escritorios: <PiDeskFill className="w-4 h-4 text-green-700" />,
    Estanterías: <BsBookshelf className="w-4 h-4 text-green-700" />,
    MesasdeLuz: <GiTable className="w-4 h-4 text-green-700" />,
    Packs: <FiTag className="w-4 h-4 text-green-700" />,
  };

  // Detectar dispositivo
  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth;
      if (w < 768) setDevice("mobile");
      else if (w < 1024) setDevice("tablet");
      else setDevice("desktop");
    };
    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  const goToContacto = () => {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById("contacto")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // --------------------------
  // ANIMACIONES MOBILE (right → left)
  // --------------------------
  const sidebarVariants = {
    closed: { x: "100%" },
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 260, damping: 30 },
    },
  };

  return (
    // CAMBIO DE FONDO: bg-gray-50 para un blanco no tan luminoso
    <header className="w-full bg-gray-50 shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10 rounded-full shadow-lg" />
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
              Forniture<span className="text-green-700">&</span>Sofa
            </h1>
            <p className="text-xs text-gray-500 -mt-1 font-medium">
              Muebles y diseño
            </p>
          </div>
        </Link>

        {/* NAV DESKTOP (Incluye Catálogo Dropdown) */}
        <nav className="hidden md:flex items-center me-30 gap-5 text-gray-600 font-medium">
          <Link
            to="/"
            className="px-2 py-2 hover:text-green-700 transition duration-150"
          >
            Home
          </Link>

          <button
            onClick={goToContacto}
            className="px-2 py-2 hover:text-green-700 transition duration-150"
          >
            Contacto
          </button>

          {/* CATALOGO (Dropdown) */}
          <div className="relative flex items-center">
            <button
              onClick={() => setDropdownOpen((s) => !s)}
              className={`flex items-center gap-1 px-2 py-2 rounded-lg transition duration-200 font-medium
        ${
          dropdownOpen
            ? "bg-gray-100 text-green-700 shadow-sm"
            : "hover:bg-gray-100 hover:text-green-700"
        }
      `}
            >
              Catálogo
              <FiChevronDown
                className={`transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-6 w-[88vw] max-w-[850px]
            bg-white mt-105 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            border border-gray-400 p-5 z-50 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {categorias.map((cat) => (
                      <Link
                        key={cat}
                        to={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 
                  transition duration-150 group"
                      >
                        <div
                          className="p-2.5 bg-white rounded-xl border border-gray-100 
                    shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                    flex items-center justify-center"
                        >
                          {icons[cat] || <GiTable className="text-green-700" />}
                        </div>

                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800 text-sm group-hover:text-green-700">
                            {cat}
                          </span>
                          <span className="text-[11px] text-gray-500">
                            Ver colección
                          </span>
                        </div>

                        <FiChevronRight className="ml-auto text-gray-300 group-hover:text-green-700" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* BOTÓN MOBILE (Menú Hamburguesa) */}
        <div className="flex items-center gap-3 text-gray-700">
          <button
            className="p-2 rounded-full bg-gray-100 md:hidden hover:bg-gray-200 transition duration-150"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu className="text-xl" />
          </button>
        </div>
      </div>

      {/* ----------------------------- */}
      {/* MOBILE – RIGHT SIDEBAR (Simplificado) */}
      {/* ----------------------------- */}

      <AnimatePresence>
        {sidebarOpen && device === "mobile" && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* SIDEBAR */}
            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              // El sidebar tiene un fondo blanco (bg-white) para contrastar con el fondo de la página simulado (bg-gray-50)
              className="fixed top-0 right-0 h-full w-[80%]
                                bg-white shadow-2xl z-50 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Menú</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 font-semibold text-gray-800">
                <Link
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className="text-lg p-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition"
                >
                  Home
                </Link>

                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    goToContacto();
                  }}
                  className="text-lg text-left p-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition"
                >
                  Contacto
                </button>

                {/* ENLACE DIRECTO AL CATÁLOGO GENERAL (Sin Query Params para Móvil) */}
                <Link
                  to="/catalogo"
                  onClick={() => setSidebarOpen(false)}
                  className="text-lg p-2 rounded-lg hover:bg-green-50 hover:text-green-700 transition"
                >
                  Catálogo
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
