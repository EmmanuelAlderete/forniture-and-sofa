import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* LOGO */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Forniture & Sofa
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Muebles premium para tu hogar. Elegancia, estilo y calidad.
          </p>
        </div>

        {/* MENÚ */}
        <div>
          <h3 className="text-white font-semibold mb-3">Navegación</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Catálogo</li>
            <li className="hover:text-white cursor-pointer">Carrito</li>
            <li className="hover:text-white cursor-pointer">Nosotros</li>
            <li className="hover:text-white cursor-pointer">Contacto</li>
          </ul>
        </div>

        {/* CATEGORÍAS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Categorías</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-white cursor-pointer">Sofás</li>
            <li className="hover:text-white cursor-pointer">Sillas</li>
            <li className="hover:text-white cursor-pointer">Mesas</li>
            <li className="hover:text-white cursor-pointer">Decoración</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-3">Newsletter</h3>
          <p className="text-sm mb-3 text-gray-400">
            Recibí ofertas exclusivas y avisos de nuevos productos.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Tu email"
              className="px-3 py-2 rounded-l-lg w-full text-black outline-none"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition">
              Enviar
            </button>
          </div>
        </div>

      </div>

      {/* SOCIAL + COPYRIGHT */}
      <div className="border-t border-gray-700 mt-10 pt-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Forniture & Sofa — Todos los derechos reservados.
        </p>

        <div className="flex gap-4 text-gray-300">
          <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
          <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
          <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
        </div>

      </div>
    </footer>
  );
}
