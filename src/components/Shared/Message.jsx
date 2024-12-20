import { useEffect, useState } from "react";

const Message = ({ variant = "info", message, isFixed = false, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false); // Animación de desvanecimiento

  const variantClasses = {
    info: "bg-secondary-default text-white",
    success: "bg-primary-default text-black",
    warning: "bg-white text-secondary-dark",
    error: "bg-red-500 text-white",
  };

  const iconMap = {
    info: "info",
    success: "check_circle",
    warning: "warning",
    error: "error",
  };

  const fixedStyles = isFixed
    ? "fixed bottom-4 left-0 right-0 flex justify-center z-50 px-4"
    : "w-full flex justify-center mt-4";

  useEffect(() => {
    if (isFixed) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          if (onClose) onClose();
        }, 300); // Duración de la animación
      }, 2700); // Tiempo antes de desaparecer automáticamente

      return () => clearTimeout(timer);
    }
  }, [isFixed, onClose]);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${fixedStyles} transition-opacity duration-300 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`flex items-center w-full p-4 rounded-lg shadow-lg ${
          variantClasses[variant] || variantClasses.info
        }`}
      >
        {/* Ícono del mensaje */}
        <span className="material-symbols-rounded text-3xl mr-4">
          {iconMap[variant] || "info"}
        </span>

        <div className="flex-1 text-sm font-medium">{message}</div>

        {isFixed && (
          <button
            className="flex items-center justify-center p-2"
            onClick={handleClose}
          >
            <i className="material-symbols-rounded text-secondary-dark text-2xl">
              close
            </i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;
