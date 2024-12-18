//

import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "./Shared/IconButton";

const NavigationMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  const getIconStyle = (active) =>
    active ? "text-primary" : "text-white opacity-70";

  return (
    <nav className="fixed bottom-0 left-0 w-full h-12 bg-secondary-dark flex justify-around items-center border-t-2 border-secondary-default z-10">
      <IconButton
        icon="check_box_outline_blank"
        onClick={() => navigate("/")}
        className={getIconStyle(isActive("/"))}
      />
      <IconButton
        icon="list"
        onClick={() => navigate("/lists")}
        className={getIconStyle(isActive("/lists"))}
      />
      <IconButton
        icon="favorite"
        onClick={() => navigate("/favorites")}
        className={getIconStyle(isActive("/favorites"))}
      />
      <IconButton
        icon="settings"
        onClick={() => navigate("/settings")}
        className={getIconStyle(isActive("/settings"))}
      />
    </nav>
  );
};

export default NavigationMenu;
