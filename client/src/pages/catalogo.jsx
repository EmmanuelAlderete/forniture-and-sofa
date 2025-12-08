// pages/Catalogo.jsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, ProductCard } from "../components/index.jsx";
import productos from "../products/catalogo.json";
import { BiSearch, BiX, BiFilter } from "react-icons/bi";
import { useLocation } from "react-router-dom";

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

  // CATEGORÍAS CORRECTAS DEL JSON REAL
  const categorias = useMemo(() => {
    const setCat = new Set(productos.map((p) => p.categoria));
    return ["Todas", ...setCat];
  }, []);

  useEffect(() => {
    if (!categoriaURL) return;
    const match = categorias.find(
      (c) => normalize(c) === normalize(categoriaURL)
    );
    if (match) setCategoriaActiva(match);
  }, [categoriaURL, categorias]);

  useEffect(() => {
    if (queryURL) setQuery(queryURL);
  }, [queryURL]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(normalize(query)), 350);
    return () => clearTimeout(t);
  }, [query]);

  // FILTRADO FINAL
  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideBusqueda =
        !debouncedQuery ||
        [
          normalize(p.titulo),
          normalize(p.descripcionCorta),
          normalize(p.categoria),
          normalize(p.colores?.[0]?.nombre || ""),
        ].some((campo) => campo.includes(debouncedQuery));

      const coincideCategoria =
        categoriaActiva === "Todas" ||
        normalize(p.categoria) === normalize(categoriaActiva);

      return coincideBusqueda && coincideCategoria;
    });
  }, [debouncedQuery, categoriaActiva]);

  return (
    <Layout>
      <section className="px-6 py-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
        {/* SIDEBAR */}
        <aside className="hidden md:block border-r border-gray-100 pr-6">
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
                        ? "bg-green-700 text-white shadow-md"
                        : "text-gray-700 hover:bg-green-50"
                    }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN */}
        <div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-3xl md:text-4xl font-extrabold text-gray-900"
            >
              Catálogo
            </motion.h2>

            <p className="text-sm text-gray-600">
              {productosFiltrados.length} resultados
            </p>
          </div>

          {/* BUSCADOR */}
          <div className="flex items-center gap-3 mb-10">
            <div className="relative flex-1">
              <BiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="search"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white
                  text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-100"
              />

              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-green-50"
                >
                  <BiX size={18} className="text-gray-600" />
                </button>
              )}
            </div>

            <button
              onClick={() => setOpenFilter(true)}
              className="md:hidden p-3 rounded-xl border bg-white shadow-sm hover:bg-green-50"
            >
              <BiFilter size={22} className="text-gray-700" />
            </button>
          </div>

          {/* GRID */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center"
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
                  className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 hover:bg-green-100"
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
              className="fixed right-0 top-0 h-full w-72 bg-white z-50 shadow-xl p-6 overflow-y-auto border-l border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Filtrar por categoría
                </h3>
                <button onClick={() => setOpenFilter(false)}>
                  <BiX
                    size={26}
                    className="text-gray-700 hover:text-green-700"
                  />
                </button>
              </div>

              <div className="space-y-3">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoriaActiva(cat);
                      setOpenFilter(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition
                      ${
                        categoriaActiva === cat
                          ? "bg-green-700 text-white shadow-md"
                          : "text-gray-700 hover:bg-green-50"
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
