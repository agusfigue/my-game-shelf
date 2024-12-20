import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Shared/Loader";
import Message from "./Shared/Message";
import BackButton from "./Shared/BackButton";
import Pill from "./Shared/Pill";
import useGamesStore from "./stores/useGamesStore";
import AddToListModal from "./Shared/AddToListModal";
import IconButtonSwipe from "./Shared/IconButtonSwipe";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { discardGame, applyFilters } = useGamesStore();

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
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleDiscard = () => {
    if (gameDetails) {
      discardGame(gameDetails); // Descartar el juego
      applyFilters(); // Aplicar filtros para actualizar la lista

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
        message: `${gameDetails.name} has been added to the list "${listName}" succesfully.`,
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
    <section className="min-h-[calc(100vh-6rem)] bg-secondary-dark text-white pb-20 pt-14 relative">
      {/* Imagen de fondo con degradado */}
      <div className="relative">
        <img
          src={gameDetails.background_image}
          alt={gameDetails.name}
          className="w-full h-[50vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        {/* Calificación en la esquina superior derecha */}
        <div className="absolute top-4 right-4">
          <Pill
            label={`★ ${gameDetails.rating || "N/A"}`}
            color="bg-yellow-300"
            textColor="text-black"
          />
        </div>

        {/* Título y géneros */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
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

        {/* Botón de regreso */}
        <BackButton to="/" className="absolute top-4 left-4" />
      </div>

      {/* Descripción y botones */}
      <div className="p-4">
        <p className="mb-2">
          <strong>Date of launch:</strong> {gameDetails.released}
        </p>

        {/* Descripción con "See more" */}
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

      {/* Botones de acción */}
      <div className="px-2 flex justify-around text-secondary-dark">
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

      {/* Modal para agregar a listas */}
      <AddToListModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        currentGame={gameDetails}
        onGameAdded={handleGameAddedToList}
      />
    </section>
  );
};

export default GameDetails;
