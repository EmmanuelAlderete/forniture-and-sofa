import { Header, Footer } from "../components";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1">

        {/* HERO */}
        <section className="relative h-[50vh] md:h-[65vh] w-full 
          bg-[url('/hero2.jpg')] 
          bg-no-repeat bg-center 
          bg-[length:100%_auto] md:bg-cover flex items-center justify-center">

          {/* Overlay suave */}
          <div className="absolute inset-0 bg-black/15"></div>

          {/* Sombreado interno profesional */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_70px_rgba(0,0,0,0.28)]"></div>

          {/* Contenido */}
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">
              Forniture & Sofa
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-sm">
              Muebles de diseño, sofás premium y decoración moderna hecha para tu estilo de vida.
            </p>

            <button className="mt-8 px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300">
              Explorar colección
            </button>
          </div>
        </section>




        {/* PRODUCTS PREVIEW */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Productos Destacados
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-4 h-52 flex items-center justify-center text-gray-500">
              Producto 1
            </div>
            <div className="bg-white rounded-xl shadow p-4 h-52 flex items-center justify-center text-gray-500">
              Producto 2
            </div>
            <div className="bg-white rounded-xl shadow p-4 h-52 flex items-center justify-center text-gray-500">
              Producto 3
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
