import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    documentNumber: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/v1/register", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage(
          `Usuario registrado correctamente, el token generado es ${data.token}`
        );
      } else {
        setResponseMessage(
          `Error al hacer proceso de registro de nuevo usuario, error: ${data.message}`
        );
      }
    } catch (error) {
      setResponseMessage(
        `Error al hacer proceso de registro de nuevo usuario, error: ${error.message}`
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Registrar cuenta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              placeholder="Alejandro05"
              required
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-gray-300">Correo Electronico</label>
            <input
              type="email"
              name="email"
              placeholder="tu_correo@gmail.com"
              required
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-gray-300">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              required
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-gray-300">Identificación</label>
            <input
              type="text"
              name="documentNumber"
              placeholder="98765432"
              required
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
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
          <div className="mt-4 p-3 rounded-lg bg-gray-700 text-gray-100 text-center">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
}
