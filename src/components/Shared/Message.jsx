import { useEffect, useState } from "react";

const Message = ({ variant = "info", message, isFixed = false, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const variantClasses = {
    info: "bg-secondary-default text-white",
    success: "bg-primary-default text-black",
    warning: "bg-white text-secondary-dark",
    error: "bg-red-500 text-white",
  };

  const fixedStyles = isFixed
    ? "fixed bottom-4 left-0 right-0 flex justify-center z-50 mx-4"
    : "";

  useEffect(() => {
    if (isFixed) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isFixed, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${fixedStyles}`}>
      <div
        className={`w-full max-w-md p-4 rounded-lg shadow-lg ${
          variantClasses[variant] || variantClasses.info
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Message;
