import { useEffect, useState } from "react";
import useGamesStore from "./stores/useGamesStore";
import GameCardSwipe from "./GameCardSwipe";
import Loader from "./Shared/Loader";
import Message from "./Shared/Message";
import IconButton from "./Shared/IconButton";
import Filters from "./Filters";
import IconButtonSwipe from "./Shared/IconButtonSwipe";
import Modal from "./Shared/Modal";

const Games = () => {
  const {
    games,
    allGames,
    fetchGames,
    addFavorite,
    discardGame,
    filters,
    applyFilters,
  } = useGamesStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadGames = async () => {
      if (allGames.length === 0) {
        setIsLoading(true);
        try {
          await fetchGames();
        } catch (error) {
          setError(true);
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadGames();
  }, [allGames, fetchGames]);

  const handleFavorite = () => {
    const currentGame = games[0];
    if (currentGame) {
      addFavorite(currentGame);
      applyFilters();
    }
  };

  const handleDiscard = () => {
    const currentGame = games[0];
    if (currentGame) {
      discardGame(currentGame);
      applyFilters();
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <section className="mt-12 mb-12 min-h-[calc(100vh-6rem)] bg-secondary-dark p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-white">Swipe games ({games.length})</h2>
        <IconButton
          icon="filter_alt"
          onClick={() => setShowFilters((prev) => !prev)}
        />
      </header>

      {showFilters && (
        <div className="mb-4 p-4 bg-gray-800 rounded-md">
          <Filters
            genres={
              [
                /* Tus géneros */
              ]
            }
            setSelectedCategory={(category) => {
              useGamesStore.getState().filters.category = category;
              applyFilters();
            }}
            selectedCategory={filters.category}
            setSelectedRating={(rating) => {
              useGamesStore.getState().filters.rating = rating;
              applyFilters();
            }}
            selectedRating={filters.rating}
          />
          <button
            className="mt-4 w-full py-2 bg-primary text-white rounded-md"
            onClick={() => setShowFilters(false)}
          >
            HIDE FILTERS
          </button>
        </div>
      )}

      {isLoading && <Loader />}
      <div className="flex flex-wrap gap-4">
        {games?.length > 0 && (
          <GameCardSwipe
            key={games[0]?.id}
            id={games[0]?.id}
            title={games[0]?.name}
            category={games[0]?.genres[0]?.name}
            img={games[0]?.background_image}
          />
        )}
      </div>

      {!isLoading && games?.length === 0 && (
        <Message variant="info" message="No games found" />
      )}
      {error && <Message variant="error" message="Error loading games" />}

      <div className="flex justify-around mt-4">
        <IconButtonSwipe
          icon="thumb_down"
          color="bg-red-500"
          onClick={handleDiscard}
        />
        <IconButtonSwipe
          icon="favorite"
          color="bg-cyan-400"
          onClick={handleFavorite}
        />
        <IconButtonSwipe
          icon="playlist_add"
          color="bg-primary-default"
          onClick={handleOpenModal} // Abrir el modal
        />
      </div>

      {/* Modal para agregar a listas */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        currentGame={games[0]} // Pasar el juego actual
      />
    </section>
  );
};

export default Games;
