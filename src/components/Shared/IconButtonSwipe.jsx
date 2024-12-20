const IconButtonSwipe = ({ icon, color, onClick, text, disabled }) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`flex flex-col items-center justify-center py-2 px-4 mx-2 w-full rounded-lg ${color} ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
      } shadow-md transition`}
    >
      <span className="material-icons text-3xl mb-1">{icon}</span>
      {text && <span className="text-xs font-medium">{text}</span>}
    </button>
  );
};

export default IconButtonSwipe;
