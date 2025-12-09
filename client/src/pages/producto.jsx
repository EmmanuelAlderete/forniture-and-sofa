import React, { useState, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "../components/index.jsx";
import productos from "../products/catalogo.json";
import { FiChevronLeft, FiExternalLink } from "react-icons/fi";
import EmailForm from "../components/EmailForm.jsx";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const imgRef = useRef(null);

  const producto = useMemo(
    () =>
      productos.find(
        (p) => String(p.id) === String(id) || String(p.slug) === String(id)
      ) ||
      productos[0] ||
      {},
    [id]
  );

  const gallery = useMemo(() => {
    if (Array.isArray(producto.imagenes) && producto.imagenes.length) {
      return producto.imagenes;
    }
    if (producto.imagen) return [producto.imagen];
    return ["/placeholder.webp"];
  }, [producto]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeSrc = gallery[activeIndex];

  const precioFormateado = Number(producto.precio || 0).toLocaleString(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }
  );

  const colorPrincipalObj =
    Array.isArray(producto.colores) && producto.colores.length
      ? producto.colores[0]
      : null;
  const colorNombre =
    colorPrincipalObj && (colorPrincipalObj.nombre || colorPrincipalObj.name)
      ? colorPrincipalObj.nombre || colorPrincipalObj.name
      : producto.color || "Tono";

  const colorHex =
    colorPrincipalObj && (colorPrincipalObj.hex || colorPrincipalObj.colorHex)
      ? colorPrincipalObj.hex || colorPrincipalObj.colorHex
      : colorToHex(colorNombre);

  const productoCategoria =
    producto.categoria ||
    (Array.isArray(producto.categorias) && producto.categorias[0]);

  const related = productos
    .filter(
      (p) =>
        p.id !== producto.id &&
        (p.categoria === productoCategoria ||
          (Array.isArray(p.categorias) &&
            productoCategoria &&
            p.categorias.includes(productoCategoria)))
    )
    .slice(0, 4);

  const whatsappNumber = "5491132797665";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hola!%20Estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(
    producto.titulo || producto.nombre
  )}`;

  return (
    <Layout>
      <section className="px-6 py-12 max-w-7xl mx-auto">
        {/* Breadcrumb + back */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            aria-label="Volver"
            className="p-2 rounded-lg"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div className="text-sm text-gray-600">
            <Link to="/catalogo" className="hover:text-green-700">
              Catálogo
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-800 font-medium">
              {producto.titulo || producto.nombre}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* LEFT - Gallery + description */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_19px_30px_rgba(16,24,40,0.06)] p-6">
              <div className="relative overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center">
                <motion.img
                  ref={imgRef}
                  key={activeSrc}
                  src={activeSrc}
                  alt={producto.titulo || producto.nombre}
                  initial={{ opacity: 0.9, scale: 0.995 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="w-full max-h-[64vh] object-contain select-none"
                  onClick={() => setLightboxOpen(true)}
                  srcSet={`${activeSrc} 1x, ${activeSrc} 2x`}
                />

                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition"
                >
                  <FiExternalLink className="w-4 h-4 text-gray-800" />
                  <span className="text-xs text-gray-700 font-medium">
                    Ver imagen
                  </span>
                </button>
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-[10px] pb-1">
                  {gallery.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setActiveIndex(i)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-shadow duration-200 ${
                        i === activeIndex
                          ? "ring-2 ring-green-400 shadow-xl"
                          : "border-gray-100 hover:shadow-sm"
                      }`}
                      aria-label={`Ver imagen ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${producto.titulo} ${i + 1}`}
                        className="w-full h-full object-cover"
                        srcSet={`${src} 1x, ${src} 2x`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(16,24,40,0.04)] p-6"
            >
              <h1 className="text-3xl font-extrabold text-gray-900">
                {producto.titulo || producto.nombre}
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                {producto.categoria || (producto.categorias || []).join(" • ")}
              </p>

              <p className="mt-4 text-gray-700 leading-relaxed">
                {producto.descripcionLarga ||
                  producto.descripcion ||
                  producto.descripcionCorta}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* ... resto del contenido como especificaciones y colores */}
              </div>
            </motion.div>

            {/* Related */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Productos relacionados
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/producto/${r.id}`}
                    className="block group"
                  >
                    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm group-hover:shadow-lg transition">
                      <div className="h-28 w-full rounded-md overflow-hidden">
                        <img
                          src={(r.imagenes && r.imagenes[0]) || r.imagen}
                          alt={r.titulo || r.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-3 text-sm font-medium text-gray-800">
                        {r.titulo || r.nombre}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - Panel */}
          <aside className="sticky top-24">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(16,24,40,0.06)] p-6 w-full max-w-[380px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Precio</p>
                  <p className="text-3xl font-extrabold text-green-700">
                    {precioFormateado}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <p className="text-sm text-gray-600">
                  Consultar disponibilidad
                </p>

                {/* ICONO PREMIUM + TOOLTIP */}
                <div className="relative inline-block group">
                  {/* ICONO CÍRCULO */}
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-700 text-xs font-semibold cursor-pointer shadow-md shadow-green-500/10 backdrop-blur-xl transition-all duration-300 group-hover:from-green-500/40 group-hover:to-emerald-500/40 group-hover:text-white group-hover:border-green-400">
                    i
                  </div>

                  {/* TOOLTIP PREMIUM */}
                  <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border border-green-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl text-gray-300 text-xs leading-relaxed">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-xl opacity-40"></div>

                      <div className="relative flex items-start gap-3">
                        <p className="relative text-gray-200">
                          Comunicate con el proveedor para consultar
                          disponibilidad, solicitar presupuestos o recibir más
                          información.
                        </p>
                      </div>

                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-r border-b border-green-500/20"></div>
                    </div>
                  </div>
                </div>
              </div>

              <EmailForm producto={producto} />
            </div>
          </aside>
        </div>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
            >
              <motion.img
                src={activeSrc}
                alt={producto.titulo || producto.nombre}
                initial={{ scale: 0.95, opacity: 0.95 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="max-w-[94vw] max-h-[94vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTÓN FLOTANTE WHATSAPP */}
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-xl flex items-center justify-center cursor-pointer"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-label="Contactar por WhatsApp"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-200 shadow-xl flex items-center justify-center relative overflow-hidden">
            {/* Cambiado SVG por imagen */}
            <img
              src="/whatsapp.webp"
              alt="WhatsApp"
              className="w-15 h-15 z-10"
            />

            <span
              className="absolute w-full h-full rounded-full bg-green-400/50 animate-ping opacity-75"
              style={{ animationDuration: "2s" }}
            ></span>
          </div>
        </motion.a>
      </section>
    </Layout>
  );
}

// colorToHex y isHex como antes
function colorToHex(input) {
  if (!input) return "#D9D9D9";
  if (typeof input === "object") {
    if (input.hex && isHex(input.hex)) return input.hex;
    if (input.nombre) input = input.nombre;
    else return "#D9D9D9";
  }
  if (typeof input !== "string") return "#D9D9D9";
  const name = input.toLowerCase().trim();
  const map = {
    negro: "#000000",
    blanco: "#FFFFFF",
    gris: "#BDBDBD",
    beige: "#E2D2B6",
    madera: "#C9A27A",
    "gris claro": "#C8C8C8",
    "beige arena": "#E8DCC2",
    roble: "#C8B7A6",
    nogal: "#8B6B4F",
    "verde oliva": "#738074",
  };
  return map[name] || (isHex(input) ? input : "#D9D9D9");
}

function isHex(str) {
  return typeof str === "string" && /^#([0-9A-F]{3}){1,2}$/i.test(str);
}
