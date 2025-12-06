import { Header, Footer } from "../components";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 scroll-smooth">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* HERO */}
        <section
          className="relative h-[55vh] md:h-[65vh] w-full
          bg-[url('/hero2.jpg')] bg-no-repeat bg-center
          bg-[length:100%_auto] md:bg-cover flex items-center justify-center"
        >
          {/* Overlay suave */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Sombreado interno elegante */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_90px_rgba(0,0,0,0.35)]"></div>

          {/* Contenido */}
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
              Forniture & Sofa
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-sm">
              Sofás premium, muebles de diseño y decoración moderna para
              transformar tu espacio.
            </p>

            <button
              className="mt-10 px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl
              shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
            >
              Explorar colección
            </button>
          </div>
        </section>
        {/* CONTACTO (scroll desde Header) */}
        <section
          id="contacto"
          className="bg-white py-20 border-t border-gray-200"
        >
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Contáctanos
            </h2>

            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              ¿Tenés alguna consulta? Estamos para ayudarte a transformar tu
              hogar.
            </p>

            <form className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Nombre"
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 outline-none"
              />

              <textarea
                placeholder="Mensaje"
                className="md:col-span-2 p-3 h-32 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 outline-none resize-none"
              />

              <button className="md:col-span-2 w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
