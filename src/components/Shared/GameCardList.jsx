const GameCardList = ({ game }) => {
  return (
    <div className="rounded-xl p-4 bg-secondary-default text-white">
      <img
        src={game.background_image}
        alt={game.name}
        className="rounded-lg mb-2"
      />
      <h3 className="font-semibold">{game.name}</h3>
      <p className="text-sm text-gray-400">
        {game.genres?.map((g) => g.name).join(", ") || "No genres available"}
      </p>
    </div>
  );
};

export default GameCardList;
