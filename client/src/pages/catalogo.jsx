// Catalogo.jsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, ProductCard } from "../components/index.jsx";
import productos from "../products/catalogo.json";
import { BiSearch, BiX, BiFilter } from "react-icons/bi";
import { useLocation } from "react-router-dom";

// Normalización
function normalize(str = "") {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase()
    .trim();
}

export default function Catalogo() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const categoriaURL = params.get("categoria") || "";
  const queryURL = params.get("query") || "";

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [openFilter, setOpenFilter] = useState(false);

  // CATEGORÍAS DINÁMICAS
  const categorias = useMemo(() => {
    const c = new Set(productos.map((p) => p.categoria || "Otros"));
    return ["Todas", ...c];
  }, []);

  // ---- SYNC CATEGORÍA DESDE URL ----
  useEffect(() => {
    if (!categoriaURL) return;

    const match = categorias.find(
      (c) => normalize(c) === normalize(categoriaURL)
    );

    if (match) setCategoriaActiva(match);
  }, [categoriaURL, categorias]);

  // ---- SYNC QUERY DESDE URL ----
  useEffect(() => {
    if (queryURL) {
      setQuery(queryURL);
    }
  }, [queryURL]);

  // ---- Debounce búsqueda ----
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(normalize(query)), 350);
    return () => clearTimeout(t);
  }, [query]);

  // ---- FILTRO FINAL ----
  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideBusqueda = (() => {
        if (!debouncedQuery) return true;

        const campos = [
          normalize(p.nombre),
          normalize(p.descripcion),
          normalize(p.color),
          normalize(p.medidas),
          normalize(p.categoria),
        ];

        return campos.some((campo) => campo.includes(debouncedQuery));
      })();

      const coincideCategoria =
        categoriaActiva === "Todas" ||
        normalize(p.categoria) === normalize(categoriaActiva);

      return coincideBusqueda && coincideCategoria;
    });
  }, [debouncedQuery, categoriaActiva]);

  return (
    <Layout>
      <section className="px-6 py-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden md:block border-r pr-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Categorías
          </h3>

          <ul className="space-y-2">
            {categorias.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCategoriaActiva(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition
                    ${
                      categoriaActiva === cat
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <div>
          {/* HEADER */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-3xl md:text-4xl font-extrabold text-gray-900"
            >
              Catálogo
            </motion.h2>

            <p className="text-sm text-gray-600 text-right md:text-left">
              {productosFiltrados.length} resultados
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-3 mb-10">
            <div className="relative flex-1">
              <BiSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white
                  text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100"
              />

              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-gray-100"
                >
                  <BiX size={18} className="text-gray-500" />
                </button>
              )}
            </div>

            <button
              onClick={() => setOpenFilter(true)}
              className="md:hidden p-3 rounded-xl border bg-white shadow-sm hover:bg-gray-50"
            >
              <BiFilter size={22} className="text-gray-700" />
            </button>
          </div>

          {/* GRID */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                >
                  <ProductCard producto={item} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20"
              >
                <p className="text-lg text-gray-600 mb-4">
                  No se encontraron resultados para{" "}
                  <span className="font-medium text-gray-800">"{query}"</span>
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="px-4 py-2 bg-gray-100 border rounded-lg text-sm hover:bg-gray-200"
                >
                  Limpiar búsqueda
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* FILTRO MOBILE */}
      <AnimatePresence>
        {openFilter && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenFilter(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed right-0 top-0 h-full w-72 bg-white z-50 shadow-xl p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Filtrar por categoría
                </h3>
                <button onClick={() => setOpenFilter(false)}>
                  <BiX size={26} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-2">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoriaActiva(cat);
                      setOpenFilter(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition 
                      ${
                        categoriaActiva === cat
                          ? "bg-indigo-600 text-white shadow"
                          : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}
