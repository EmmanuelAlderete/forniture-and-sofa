// components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ producto }) {
  const {
    id,
    titulo,
    precio,
    colores = [],
    medidas = {},
    imagenes = [],
    categoria,
    descripcionCorta,
  } = producto;

  const imagen = imagenes[0] || "https://via.placeholder.com/400";

  const precioFormateado = precio.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

  const medidasTexto = `${medidas.alto} × ${medidas.ancho} × ${medidas.profundidad} cm`;

  return (
    <Link to={`/producto/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        whileHover={{ scale: 1.025 }}
        className="
          group relative w-full max-w-[310px] cursor-pointer 
          bg-white rounded-3xl overflow-hidden 
          border border-gray-200 
          shadow-[0_4px_16px_rgba(0,0,0,0.05)]
          hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]
          transition-all duration-300
        "
      >
        {/* BADGE */}
        <div className="absolute z-20 top-3 left-3">
          <span className="bg-green-600/90 text-white text-xs px-3 py-1 rounded-full shadow">
            {categoria}
          </span>
        </div>

        {/* IMAGEN */}
        <div className="relative bg-gray-50 h-64 flex items-center justify-center overflow-hidden">
          <img
            src={imagen}
            alt={titulo}
            className="
              w-full h-full object-contain
              transition-transform duration-700 
              group-hover:scale-110
            "
          />

          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="
              absolute inset-0 
              bg-black/20 backdrop-blur-sm
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 z-10
              flex items-end justify-center pb-4
            "
          >
            <button
              className="
                bg-white/90 text-green-700 font-semibold text-sm
                px-5 py-2 rounded-xl shadow-md
                hover:bg-white transition
              "
            >
              Ver detalles
            </button>
          </motion.div>
        </div>

        {/* CONTENIDO */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {titulo}
          </h3>

          <p className="text-sm text-gray-500 mb-2 line-clamp-1">
            {colores[0]?.nombre || "Color único"} • {medidasTexto}
          </p>

          {/* PRECIO */}
          <p className="text-2xl font-bold text-green-700 mb-1">
            {precioFormateado}
          </p>

          <p className="text-xs text-gray-500 line-clamp-2">
            {descripcionCorta}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
