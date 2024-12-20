import { useEffect, useState } from "react";
import useGamesStore from "../stores/useGamesStore";
import GameCardSwipe from "./GameCardSwipe";
import Loader from "./Shared/Loader";
import Message from "./Shared/Message";
import IconButton from "./Shared/IconButton";
import Filters from "./Filters";
import IconButtonSwipe from "./Shared/IconButtonSwipe";
import AddToListModal from "./Shared/AddToListModal";
import { useLocation } from "react-router-dom";

const Games = () => {
  const location = useLocation();
  const {
    games,
    allGames,
    fetchGames,
    discardGame,
    filters,
    applyFilters,
    setSearchQuery,
  } = useGamesStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fixedMessage, setFixedMessage] = useState(location.state || null);

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

    if (location.state) {
      setTimeout(() => setFixedMessage(null), 3000);
    }
  }, [allGames, fetchGames, location.state]);

  const handleDiscard = () => {
    const currentGame = games[0];
    if (currentGame) {
      discardGame(currentGame);
      applyFilters();
      setFixedMessage({
        message: `${currentGame.name} has been discarded.`,
        type: "warning",
      });
      setTimeout(() => setFixedMessage(null), 3000);
    }
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    applyFilters();
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <section className="flex justify-center items-center mt-12 mb-12 min-h-[calc(100vh-6rem)]">
      {fixedMessage && (
        <Message
          variant={fixedMessage.type}
          message={fixedMessage.message}
          isFixed
        />
      )}

      <div className="w-full max-w-md bg-secondary-dark p-4 rounded-lg">
        <header className="flex w-full justify-between items-center mb-4">
          <h2 className="text-white text-xl font-bold">
            Swipe games ({games.length})
          </h2>
          <IconButton
            icon="filter_alt"
            onClick={() => setShowFilters((prev) => !prev)}
          />
        </header>

        {showFilters && (
          <div className="mb-4">
            <Filters
              genres={[
                "all",
                ...new Set(
                  allGames.flatMap((game) =>
                    game.genres?.map((genre) => genre.name.toLowerCase())
                  )
                ),
              ]}
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
              searchQuery={filters.search}
              setSearchQuery={handleSearchQueryChange}
              onHideFilters={() => setShowFilters(false)}
            />
          </div>
        )}

        {isLoading && <Loader />}
        <div className="flex flex-wrap gap-4">
          {games?.length > 0 && (
            <GameCardSwipe
              key={games[0]?.id}
              id={games[0]?.id}
              title={games[0]?.name}
              genres={games[0]?.genres.map((genre) => genre.name)}
              img={games[0]?.background_image}
              rating={games[0]?.rating || "N/A"}
            />
          )}
        </div>

        {!isLoading && games?.length === 0 && (
          <Message variant="info" message="No games found" />
        )}
        {error && <Message variant="error" message="Error loading games" />}

        <AddToListModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            applyFilters();
          }}
          currentGame={games[0]}
          onGameAdded={(message) => {
            setFixedMessage({
              message,
              type: "success",
            });
            setTimeout(() => setFixedMessage(null), 3000);
          }}
        />

        {/* Botones de acción con disabled si no hay juegos */}
        <div className="flex justify-between mt-4 text-secondary-dark">
          <IconButtonSwipe
            icon="thumb_down"
            color="bg-red-500"
            text="Discard"
            onClick={handleDiscard}
            disabled={games.length === 0}
          />
          <IconButtonSwipe
            icon="favorite"
            color="bg-primary-default"
            text="Add to List"
            onClick={handleOpenModal}
            disabled={games.length === 0}
          />
        </div>
      </div>

      {fixedMessage && (
        <Message
          variant={fixedMessage.type}
          message={fixedMessage.message}
          isFixed
        />
      )}
    </section>
  );
};

export default Games;
