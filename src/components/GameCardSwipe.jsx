import { Link } from "react-router-dom";
import IconButtonText from "./Shared/IconButtonText";
import Pill from "./Shared/Pill";

const GameCardSwipe = (props) => {
  const { id, title, genres, img, rating } = props; // Cambié "category" por "genres"

  // Limitar el título a 30 caracteres y agregar "..."
  const truncatedTitle =
    title.length > 30 ? `${title.substring(0, 30)}...` : title;

  return (
    <div className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg">
      {/* Imagen ocupa toda la card */}
      <img src={img} alt={title} className="w-full h-80 object-cover" />

      {/* Calificación como una Pill en la esquina superior derecha */}
      <div className="absolute top-3 right-4">
        <Pill
          label={`★ ${rating || "N/A"}`}
          color="bg-yellow-300"
          textColor="text-black"
        />
      </div>

      {/* Contenido sobre la imagen con degradado */}
      <div
        className="absolute bottom-0 left-0 right-0 pb-1 px-3 pt-40 text-white"
        style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 1), transparent)",
        }}
      >
        <h2 className="font-semibold text-xl">{truncatedTitle}</h2>

        {/* Mostrar todos los géneros */}
        <div className="flex flex-wrap gap-2 mb-2">
          {genres.map((genre, index) => (
            <Pill
              key={index} // Cada género debe tener un key único
              label={genre}
              color="bg-cyan-400"
              textColor="text-black"
            />
          ))}
        </div>

        {/* Botón Show more */}
        <div className="mt-2">
          <Link to={`/game/${id}`}>
            <IconButtonText
              icon="visibility" // Icono de "ver más"
              text="See More" // Texto del botón
              color="bg-white" // Color de fondo
              onClick={() => {}} // No es necesario para enlaces
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCardSwipe;
