const ListCard = ({ list }) => {
  // Obtener las 4 primeras imágenes de los juegos
  const firstFourImages = list.items
    .slice(0, 4)
    .map((item) => item.background_image || item.img || "");

  return (
    <div className="bg-secondary-default text-white rounded-lg p-4 shadow-md flex items-center">
      {/* Contenedor de imágenes */}
      <div className="w-20 h-20 grid grid-cols-2 grid-rows-2 gap-1 flex-shrink-0">
        {Array.from({ length: 4 }).map((_, index) =>
          firstFourImages[index] ? (
            <img
              key={index}
              src={firstFourImages[index]}
              alt={`Game ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div
              key={index}
              className="w-full h-full bg-gray-600 rounded-md flex items-center justify-center"
            >
              <span className="material-symbols-rounded text-white text-sm">
                photo
              </span>
            </div>
          )
        )}
      </div>

      {/* Contenido de la lista */}
      <div className="ml-4 flex-1 truncate">
        <h3 className="text-lg font-semibold">{list.name}</h3>
        <p className="text-sm text-gray-400">{list.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          {list.items.length} {list.items.length === 1 ? "item" : "items"}
        </p>
      </div>
    </div>
  );
};

export default ListCard;
