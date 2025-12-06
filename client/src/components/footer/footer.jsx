import { Facebook, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* LOGO */}
        <div>
          <h2 className="text-2xl font-bold text-white">Forniture & Sofa</h2>
          <p className="mt-3 text-sm text-gray-400">
            Muebles y diseño para tu hogar.
          </p>
        </div>

        {/* MENÚ */}
        <div>
          <h3 className="text-white font-semibold mb-3">Menú</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Catálogo</li>
            <li className="hover:text-white cursor-pointer">Contacto</li>
          </ul>
        </div>

        {/* REDES SOCIALES */}
        <div>
          <h3 className="text-white font-semibold mb-3">Redes</h3>
          <div className="flex gap-4">
            <a className="hover:text-white transition" href="#">
              <Facebook className="w-5 h-5" />
            </a>
            <a className="hover:text-white transition" href="#">
              <Instagram className="w-5 h-5" />
            </a>
            <a className="hover:text-white transition" href="#">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 mt-10 pt-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Forniture & Sofa — Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
