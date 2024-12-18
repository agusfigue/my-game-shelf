//

import useGamesStore from "./stores/useGamesStore";
import GameCard from "./Shared/GameCard";

const Favorites = () => {
  const { favorites } = useGamesStore();

  return (
    <section className="mt-12 mb-12 min-h-[calc(100vh-6rem)] bg-secondary-dark p-4">
      <h2 className="text-white text-xl font-bold mb-4">
        Favorites ({favorites.length})
      </h2>
      <div className="flex flex-wrap gap-4">
        {favorites.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {favorites.length === 0 && (
        <p className="text-center text-gray-400 mt-4">
          No favorites added yet.
        </p>
      )}
    </section>
  );
};

export default Favorites;
