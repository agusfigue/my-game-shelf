const IconButtonText = ({ icon, color, onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className={`${color} flex w-full items-center gap-2 mt-4 justify-center px-4 py-2 rounded-md ${color} hover:opacity-80 transition`} // Botón estilizado con espacio entre icono y texto
    >
      <span className="material-icons text-lg text-secondary-dark">{icon}</span>{" "}
      {/* Icono */}
      <span className="text-sm font-medium text-secondary-dark">
        {text}
      </span>{" "}
      {/* Texto */}
    </button>
  );
};

export default IconButtonText;
