import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    documentNumber: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      const shortToken = data.token.substring(0, 15) + "...";

      if (res.ok) {
        setIsSuccess(true);
        setResponseMessage(
          `✓ Registro exitoso\n` +
          `ID de usuario: ${data.user.id}\n` +
          `Token generado: ${shortToken}`
        );
      } else {
        setIsSuccess(false);
        setResponseMessage(`Error al registrar usuario: Usuario ya existe`);
      }
    } catch (error) {
      setIsSuccess(false);
      setResponseMessage(`Error al registrar usuario: Usuario ya existe`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      
      <div className="w-full max-w-sm bg-gray-800 rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Registrar cuenta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="text-gray-300 text-sm">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              placeholder="Ejemplo_09"
              required
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white outline-none 
                         focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="tu_correo@gmail.com"
              required
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white outline-none 
                         focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              required
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white outline-none 
                         focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Identificación</label>
            <input
              type="text"
              name="documentNumber"
              placeholder="98765432"
              required
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white outline-none 
                         focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 rounded-lg font-semibold"
          >
            Registrarse
          </button>
        </form>

        {responseMessage && (
          <div className="mt-3 p-3 rounded-lg bg-gray-700 text-gray-100 text-center whitespace-pre-line text-sm">
            {responseMessage}
          </div>
        )}

        {isSuccess ? (
          <div className="mt-3 flex justify-center">
            <Link
              to="/"
              className="px-4 py-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition"
            >
              Volver al inicio
            </Link>
          </div>
        ) : (
          <p className="text-center mt-3 text-gray-400 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/" className="text-indigo-400 hover:text-indigo-300">
              Iniciar Sesión
            </Link>
          </p>
        )}

      </div>
    </div>
  );
}
