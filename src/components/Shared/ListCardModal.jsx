const ListCardModal = ({ list, onClick }) => {
  // Obtener las imágenes de los primeros cuatro juegos
  const gameImages = list.items
    ?.slice(0, 4)
    ?.map((game) => game.background_image || game.img || "");

  return (
    <div
      className="flex items-center p-3 my-2 bg-secondary-default rounded-lg cursor-pointer hover:bg-primary text-white"
      onClick={onClick}
    >
      {/* Cuadrícula de imágenes */}
      <div className="grid grid-cols-2 gap-1 w-12 h-12 mr-4">
        {Array.from({ length: 4 }).map((_, index) =>
          gameImages[index] ? (
            <img
              key={index}
              src={gameImages[index]}
              alt={`Game ${index + 1}`}
              className="w-full h-full object-cover rounded-sm"
            />
          ) : (
            <div
              key={index}
              className="w-full h-full bg-gray-600 flex items-center justify-center rounded-sm"
            >
              <span className="material-symbols-rounded text-white">photo</span>
            </div>
          )
        )}
      </div>

      {/* Nombre de la lista */}
      <h3 className="font-semibold truncate">{list.name}</h3>
    </div>
  );
};

export default ListCardModal;
