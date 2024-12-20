import { useLocation, useNavigate } from "react-router-dom";

const NavigationMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 w-full h-14 bg-secondary-dark flex justify-around items-center border-t-2 border-secondary-default z-2">
      <button
        onClick={() => navigate("/")}
        className={`flex flex-col items-center justify-center ${
          isActive("/") ? "text-white" : "text-white opacity-50"
        }`}
      >
        <span className="material-icons text-xl">home</span>
        <span className="text-xs">Home</span>
      </button>

      <button
        onClick={() => navigate("/lists")}
        className={`flex flex-col items-center justify-center ${
          isActive("/lists") ? "text-white" : "text-white opacity-50"
        }`}
      >
        <span className="material-icons text-xl">list</span>
        <span className="text-xs">Lists</span>
      </button>

      {/* Botón Settings */}
      <button
        onClick={() => navigate("/settings")}
        className={`flex flex-col items-center justify-center ${
          isActive("/settings") ? "text-white" : "text-white opacity-50"
        }`}
      >
        <span className="material-icons text-xl">settings</span>
        <span className="text-xs">Settings</span>
      </button>
    </nav>
  );
};

export default NavigationMenu;
