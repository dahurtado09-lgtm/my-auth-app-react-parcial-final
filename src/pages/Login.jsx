import { useState } from "react";
import { loginRequest } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Necesario para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginRequest(email, password);
    console.log(result);

    // Si el login fue exitoso
    if (result.status === "success") {
      // Guardar token
      localStorage.setItem("token", result.tokenJWT);

      // Guardar usuario
      localStorage.setItem("user", JSON.stringify(result.user));

      // Redirigir al welcome
      navigate("/welcome");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">

        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            className="w-20 h-20"
            alt="User"
          />
        </div>

        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Text@hotmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block text-gray-300 mb-1">Contraseña</label>
            </div>

            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-2 rounded-lg text-white font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400 text-sm">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
            Regístrate
          </Link>
        </p>

      </div>
    </div>
  );
}
