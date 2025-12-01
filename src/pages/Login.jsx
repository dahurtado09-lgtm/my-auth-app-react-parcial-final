import { useState } from "react";
import { loginRequest } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginRequest(email, password);

      if (result.status === "success") {
        localStorage.setItem("token", result.tokenJWT);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/welcome");
      } else {
        setErrorMessage("Usuario no existe, por favor registrarse");
      }
    } catch (error) {
      setErrorMessage(`Error al hacer proceso de login, error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">

        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="correo@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-white font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>

        
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-700 rounded-lg text-white text-center">
            {errorMessage}
          </div>
        )}

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
