import { Layout } from "../components/index.jsx";
import { motion } from "framer-motion";
import sobreImg1 from "../assets/sobre1.jpg";
import sobreImg2 from "../assets/sobre2.jpg";

export default function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[65vh] md:h-[80vh] w-full bg-[url('/hero2.jpg')] bg-no-repeat bg-center bg-cover flex items-center justify-center">
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_160px_rgba(0,0,0,0.55)]"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Forniture & Sofa
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Muebles premium diseñados con precisión, pensados para elevar la
            estética y comodidad de tu hogar.
          </motion.p>

          <motion.button
            className="mt-10 px-8 py-3 bg-green-800 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:bg-green-900 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            onClick={() => (window.location.href = "/catalogo")}
          >
            Ver Catálogo
          </motion.button>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          {/* Bloque 1 */}
          <motion.div
            className="md:flex md:items-center md:gap-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="md:w-1/2 mb-6 md:mb-0">
              <motion.img
                className="hidden md:block rounded-2xl shadow-xl object-cover w-full h-80 md:h-96"
                src={sobreImg1}
                alt=""
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Nuestra Filosofía
              </h2>
              <p className="text-gray-600 leading-relaxed hidden md:block">
                En Forniture & Sofa nos enfocamos en crear piezas que unen
                diseño inteligente, funcionalidad y estética moderna. Cada
                mueble es fabricado con materiales seleccionados y procesos que
                garantizan durabilidad, confort y estilo. Queremos que cada
                espacio de tu hogar cuente una historia y refleje tu
                personalidad.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4  ">
                Nuestro compromiso es ofrecer soluciones reales a quienes buscan
                calidad sin sacrificar elegancia. Creemos que un hogar bien
                diseñado cambia la forma en que se vive cada día.
              </p>
            </div>
          </motion.div>

          {/* Bloque 2 */}
          <motion.div
            className="md:flex md:items-center md:gap-12 md:flex-row-reverse"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="md:w-1/2 mb-6 md:mb-0">
              <motion.img
                className="hidden md:block rounded-2xl shadow-xl object-cover w-full h-80 md:h-96"
                src={sobreImg1}
                alt=""
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Diseño Exclusivo
              </h2>
              <p className="text-gray-600 leading-relaxed hidden md:block">
                Cada una de nuestras piezas es diseñada con un enfoque artesanal
                y contemporáneo. Apostamos por líneas limpias, materiales
                premium y detalles que realzan la elegancia del espacio.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Nuestro objetivo es crear muebles que no solo se vean bien, sino
                que transformen ambientes por completo. Diseños pensados para
                hogares modernos que valoran la armonía, el confort y la
                autenticidad.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
