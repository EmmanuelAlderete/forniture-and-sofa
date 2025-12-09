import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiLoader } from "react-icons/fi";

export default function EmailForm({ producto }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    nota: "", // 'nota' es el campo de mensaje
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(form.email)) {
      setError("Ingrese un email válido");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_sn2mqqn",
        "template_mr1fg2e",
        {
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          ciudad: form.ciudad,
          nota: form.nota,

          producto_id: producto.id,
          producto_nombre: producto.titulo,
          producto_precio: producto.precio,
          producto_color: producto.color,
          producto_medidas: `
      Alto: ${producto.medidas?.alto} cm
      Ancho: ${producto.medidas?.ancho} cm
      Profundidad: ${producto.medidas?.profundidad} cm
     `,
          producto_categoria: producto.categoria,

          producto_imagen: producto.imagenes?.[0]
            ? new URL(producto.imagenes[0], window.location.origin).href
            : "",
        },
        "o_dMBJLFui2faWyBA"
      );
      console.log(window.location.origin + "/muebles/sofa-escandinavo.jpg");

      setSent(true);
      setForm({ nombre: "", email: "", telefono: "", ciudad: "", nota: "" });
    } catch (err) {
      console.log(err);
      setError("No se pudo enviar la consulta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mt-5 space-y-4 p-6 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl shadow-xl"
    >
      {/* Título elegante */}

      <h3 className="text-lg font-semibold text-gray-800">
        Consultar disponibilidad
      </h3>
      <p className="text-xs text-gray-500 -mt-2">
        Completá tus datos y te contactaremos en breve.
      </p>

      {/* Inputs (Nombre, Email, Teléfono, Ciudad) */}
      {["nombre", "email", "telefono", "ciudad"].map((field, i) => (
        <div key={i} className="relative">
          <input
            name={field}
            // Se utiliza el atributo 'valid' para activar el estilo de la etiqueta flotante.
            // Si hay un valor, se agrega el atributo 'data-valid' (solo para que funcione con peer-valid en Tailwind).
            data-valid={!!form[field] ? "true" : undefined}
            type={field === "email" ? "email" : "text"}
            value={form[field]}
            onChange={handleChange}
            required={field === "nombre" || field === "email"}
            // Se agrega la clase 'peer-valid' basada en el atributo 'data-valid' para que funcione como :valid
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-md shadow-sm focus:ring-2 focus:ring-green-500 outline-none peer transition-all [&[data-valid='true']~label]:-top-2 [&[data-valid='true']~label]:text-xs [&[data-valid='true']~label]:text-green-600"
          />
          <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-600 bg-white/70 px-1">
            {field === "nombre"
              ? "Nombre completo"
              : field === "email"
              ? "Email"
              : field === "telefono"
              ? "Teléfono (WhatsApp)"
              : "Ciudad / Localidad"}
          </label>
        </div>
      ))}

      {/* Nota (Mensaje) - Ahora con el mismo estilo de label flotante */}
      <div className="relative">
        <textarea
          name="nota"
          rows={3}
          value={form.nota}
          onChange={handleChange}
          data-valid={!!form.nota ? "true" : undefined}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-md shadow-sm focus:ring-2 focus:ring-green-500 outline-none peer transition-all [&[data-valid='true']~label]:-top-2 [&[data-valid='true']~label]:text-xs [&[data-valid='true']~label]:text-green-600"
        />
        <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-600 bg-white/70 px-1">
          Mensaje (opcional)
        </label>
      </div>

      {/* Botón */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg flex items-center justify-center gap-2 transition ${
          loading
            ? "bg-green-400"
            : sent
            ? "bg-green-600"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading && <FiLoader className="animate-spin text-xl" />}
        {!loading && sent && <FiCheckCircle className="text-xl" />}
        {loading
          ? "Enviando..."
          : sent
          ? "Consulta enviada"
          : "Enviar consulta"}
      </motion.button>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-600 text-center mt-1">{error}</p>
      )}

      {/* Info */}
      {!sent && !error && (
        <p className="text-xs text-gray-500 text-center mt-1">
          Te responderemos dentro de 24-48 horas hábiles.
        </p>
      )}
    </motion.form>
  );
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}