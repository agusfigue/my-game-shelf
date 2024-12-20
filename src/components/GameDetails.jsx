import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Loader from "./Shared/Loader";
import Message from "./Shared/Message";
import BackButton from "./Shared/BackButton";
import Pill from "./Shared/Pill";
import useGamesStore from "../stores/useGamesStore";
import AddToListModal from "./Shared/AddToListModal";
import IconButtonSwipe from "./Shared/IconButtonSwipe";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { discardGame, applyFilters } = useGamesStore();

  const hideActions = location.state?.hideActions || false;
  const backTo = location.state?.backTo || "/";

  const apiKey = "fb576c6794d14ea39e30edc82b8561a4";

  useEffect(() => {
    const fetchGameDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${apiKey}`
        );
        const data = await res.json();
        setGameDetails(data);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleDiscard = () => {
    if (gameDetails) {
      discardGame(gameDetails);
      applyFilters();
      navigate("/", {
        state: {
          message: `${gameDetails.name} has been discarded.`,
          type: "warning",
        },
      });
    }
  };

  const handleAddToList = () => {
    if (gameDetails) {
      setShowModal(true);
    }
  };

  const handleGameAddedToList = (listName) => {
    navigate("/", {
      state: {
        message: `${gameDetails.name} has been added to the list "${listName}" successfully.`,
        type: "success",
      },
    });
  };

  if (isLoading) return <Loader />;
  if (error)
    return <Message variant="error" message="Error al cargar el juego" />;
  if (!gameDetails)
    return <Message variant="info" message="No hay datos disponibles" />;

  return (
    <section className="flex justify-center items-start min-h-screen bg-secondary-dark text-white">
      <div className="w-full max-w-screen-lg bg-secondary-dark rounded-lg mb-14 mt-14">
        <div className="relative">
          <img
            src={gameDetails.background_image}
            alt={gameDetails.name}
            className="w-full h-[50vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute top-4 left-4">
            <BackButton to={backTo} />
          </div>
          <div className="absolute top-4 right-4">
            <Pill
              label={`★ ${gameDetails.rating || "N/A"}`}
              color="bg-yellow-300"
              textColor="text-black"
            />
          </div>
          <div className="absolute bottom-4 left-4">
            <h2 className="text-2xl font-bold truncate">{gameDetails.name}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {gameDetails.genres?.map((genre) => (
                <Pill
                  key={genre.id}
                  label={genre.name}
                  color="bg-cyan-400"
                  textColor="text-black"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="mb-2">
            <strong>Date of launch:</strong> {gameDetails.released}
          </p>
          <p className="text-sm text-gray-300">
            {isDescriptionExpanded
              ? gameDetails.description_raw
              : `${gameDetails.description_raw?.substring(0, 200)}...`}
          </p>
          {gameDetails.description_raw?.length > 200 && (
            <button
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
              className="text-primary mt-2"
            >
              {isDescriptionExpanded ? "See less" : "See more"}
            </button>
          )}
        </div>

        {!hideActions && (
          <div className="flex justify-around px-4 pb-4">
            <IconButtonSwipe
              icon="thumb_down"
              color="bg-red-500"
              onClick={handleDiscard}
            />
            <IconButtonSwipe
              icon="playlist_add"
              color="bg-primary-default"
              onClick={handleAddToList}
            />
          </div>
        )}

        <div className="p-4">
          {gameDetails.metacritic && (
            <div className="mb-4">
              <h3 className="text-lg font-bold">Metacritic Score</h3>
              <div
                className={`text-white px-4 py-2 rounded-lg ${
                  gameDetails.metacritic >= 75
                    ? "bg-green-600"
                    : gameDetails.metacritic >= 50
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }`}
              >
                {gameDetails.metacritic}
              </div>
            </div>
          )}

          {gameDetails.playtime && (
            <div className="mb-4">
              <h3 className="text-lg font-bold">Playtime</h3>
              <p>{gameDetails.playtime} hours</p>
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-lg font-bold">Developers</h3>
            <p>
              {gameDetails.developers?.map((dev) => dev.name).join(", ") ||
                "N/A"}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold">Publishers</h3>
            <p>
              {gameDetails.publishers?.map((pub) => pub.name).join(", ") ||
                "N/A"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {gameDetails.tags?.map((tag) => (
                <Pill
                  key={tag.id}
                  label={tag.name}
                  color="bg-gray-700"
                  textColor="text-white"
                />
              ))}
            </div>
          </div>
        </div>

        <AddToListModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          currentGame={gameDetails}
          onGameAdded={handleGameAddedToList}
        />
      </div>
    </section>
  );
};

export default GameDetails;
