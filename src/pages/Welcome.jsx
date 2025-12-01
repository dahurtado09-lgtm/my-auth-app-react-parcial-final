import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-10 rounded-2xl text-center shadow-xl w-full max-w-md">

        <h1 className="text-3xl text-white font-bold mb-6">
          Bienvenido
        </h1>

        <div className="space-y-3 text-gray-200">

          <p>
            <strong>ID:</strong> {user?.id}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>Nombre de Usuario:</strong> {user?.username}
          </p>

        </div>

        <div className="bg-gray-700 p-4 rounded-lg mt-6 text-gray-200 italic">
          “Hola, Express funcionando con MySQL”
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 w-full py-2 rounded-lg text-white font-semibold"
        >
          Cerrar sesión
        </button>

      </div>
    </div>
  );
}
