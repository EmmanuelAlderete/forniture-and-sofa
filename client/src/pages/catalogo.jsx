import { motion } from "framer-motion";
import productos from "../products/catalogo.json";

export default function Catalogo() {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      
      {/* TÍTULO */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 text-gray-900"
      >
        Catálogo de Productos
      </motion.h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {productos.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Imagen */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="h-56 overflow-hidden"
            >
              <img
                src={item.imagen}
                alt={item.nombre}
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900">
                {item.nombre}
              </h3>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {item.descripcion}
              </p>

              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-gray-900">
                  ${item.precio}
                </p>

                <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm hover:bg-gray-800 transition">
                  Ver Más
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
