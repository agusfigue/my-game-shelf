//

import useGamesStore from "./stores/useGamesStore";
import GameCardList from "./Shared/GameCardList";

const Favorites = () => {
  const { favorites } = useGamesStore();

  return (
    <section className="mt-12 mb-12 min-h-[calc(100vh-6rem)] bg-secondary-dark p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-white">Favorites ({favorites.length})</h2>
      </header>
      <div className="flex flex-wrap gap-4">
        {favorites.map((game) => (
          <GameCardList key={game.id} game={game} />
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
