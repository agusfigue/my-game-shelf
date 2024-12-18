const IconButtonSwipe = ({ icon, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-4 rounded-full ${color} hover:opacity-80 transition`} // Tamaño grande para el botón
    >
      <span
        className="material-icons" // Icono grande y blanco
      >
        {icon}
      </span>
    </button>
  );
};

export default IconButtonSwipe;
