import Pill from "./Pill";
import IconButton from "./IconButton";

const GameCard = ({ game, onRemove, onClick }) => {
  return (
    <div
      className="flex w-full items-center p-4 bg-secondary-default text-white rounded-xl relative cursor-pointer"
      onClick={onClick} // Navegar al detalle del juego
    >
      <img
        src={game.background_image}
        alt={game.name}
        className="rounded-lg w-16 h-16 object-cover flex-shrink-0"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-semibold truncate" title={game.name}>
          {game.name.length > 25
            ? `${game.name.substring(0, 22)}...`
            : game.name}
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {game.genres?.map((genre, index) => (
            <Pill
              key={index}
              label={genre.name}
              color="bg-cyan-400"
              textColor="text-secondary-dark"
            />
          )) || <p>No genres available</p>}
        </div>
      </div>
      {onRemove && (
        <IconButton
          icon="delete"
          className="absolute top-2 right-2"
          onClick={(e) => {
            e.stopPropagation(); // Evitar que se dispare el evento onClick del contenedor
            onRemove();
          }}
        />
      )}
    </div>
  );
};

export default GameCard;
