//

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Shared/Loader";
import Message from "./Shared/Message";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
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

  if (isLoading) return <Loader />;
  if (error)
    return <Message variant="error" message="Error al cargar el juego" />;
  if (!gameDetails)
    return <Message variant="info" message="No hay datos disponibles" />;

  return (
    <section className="mt-12 mb-12 min-h-[calc(100vh-6rem)] p-4 bg-secondary-dark text-white">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md"
      >
        Volver al listado
      </button>
      <h1 className="text-3xl font-bold mb-4">{gameDetails.name}</h1>
      <img
        src={gameDetails.background_image}
        alt={gameDetails.name}
        className="w-full rounded-lg mb-4"
      />
      <p>
        <strong>Genres:</strong>{" "}
        {gameDetails.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <strong>Date of launch:</strong> {gameDetails.released}
      </p>
      <p>
        <strong>Rating:</strong> ♣ {gameDetails.rating}
      </p>
      <p className="text-xs mb-4">{gameDetails.description_raw}</p>
    </section>
  );
};

export default GameDetails;
