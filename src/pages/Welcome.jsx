import { useNavigate } from "react-router-dom";
export default function Welcome() {
  const navigate = useNavigate();

  // Obtener datos del usuario guardados en localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-2xl text-center shadow-xl">
        <h1 className="text-3xl text-white font-bold">
          ¡Bienvenido {user?.username}!
        </h1>

        <p className="text-gray-400 mt-2">{user?.email}</p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg text-white font-semibold"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
