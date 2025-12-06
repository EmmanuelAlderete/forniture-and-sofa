import React from "react";
import { motion } from "framer-motion";

export default function ProductCard({ producto }) {
  const {
    nombre = "Producto de Diseño",
    imagen = "https://via.placeholder.com/400",
    medidas = "40×60 cm",
    color = "Roble",
    precio = 150000,
    descripcion = "Producto fabricado en madera premium.",
    categoria = "Muebles",
  } = producto;

  const precioFormateado = precio.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.02 }}
      className="
        group relative w-full max-w-[280px] cursor-pointer 
        bg-white rounded-2xl overflow-hidden 
        border border-gray-100 
        shadow-sm hover:shadow-xl 
        transition-all duration-300
      "
    >
      {/* BADGE SIEMPRE VISIBLE */}
      <div className="absolute z-20 top-3 left-3">
        <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
          {categoria}
        </span>
      </div>

      {/* IMAGEN */}
      <div className="relative bg-gray-50 h-60 flex items-center justify-center overflow-hidden">
        <img
          src={imagen}
          alt={nombre}
          className="
            w-full h-full object-contain 
            transition-transform duration-500 
            group-hover:scale-105
          "
        />

        {/* OVERLAY VER DETALLES */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="
            absolute inset-0 bg-black/30 flex items-center justify-center 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 z-10
          "
        >
          <button
            className="
              bg-white text-gray-800 text-sm font-semibold 
              px-4 py-2 rounded-lg shadow-md
              hover:bg-gray-100 transition
            "
          >
            Ver Detalles
          </button>
        </motion.div>
      </div>

      {/* INFO */}
      <div className="p-4">
        <h3 className="text-[1.05rem] font-semibold text-gray-900 mb-1 line-clamp-1">
          {nombre}
        </h3>

        <p className="text-sm text-gray-500 mb-2 line-clamp-1">
          {color} • {medidas}
        </p>

        <p className="text-2xl font-bold text-indigo-600">{precioFormateado}</p>

        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
          {descripcion}
        </p>
      </div>
    </motion.div>
  );
}
