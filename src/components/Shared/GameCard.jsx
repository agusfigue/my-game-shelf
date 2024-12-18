import Pill from "./Pill";

const GameCard = ({ game }) => {
  return (
    <div className="flex w-full items-center p-4 bg-secondary-default text-white rounded-xl">
      {/* Imagen a la izquierda */}
      <img
        src={game.background_image}
        alt={game.name}
        className="rounded-lg w-16 h-16 object-cover flex-shrink-0"
      />

      {/* Detalles del juego */}
      <div className="ml-4 flex-1">
        {/* Nombre del juego con control de desborde */}
        <h3 className="text-sm font-semibold truncate" title={game.name}>
          {game.name.length > 25
            ? `${game.name.substring(0, 22)}...`
            : game.name}
        </h3>

        {/* Géneros con componente Pill */}
        <div className="flex flex-wrap gap-2 mt-2">
          {game.genres?.map((genre, index) => (
            <Pill key={index} label={genre.name} />
          )) || <p>No genres available</p>}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
