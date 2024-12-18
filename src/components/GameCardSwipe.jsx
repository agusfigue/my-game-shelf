import { Link } from "react-router-dom";
import IconButtonText from "./Shared/IconButtonText";
import Pill from "./Shared/Pill";

const GameCardSwipe = (props) => {
  const { id, title, category, img } = props;

  // Limitar el título a 25 caracteres y agregar "..."
  const truncatedTitle =
    title.length > 25 ? `${title.substring(0, 25)}...` : title;

  return (
    <div className="rounded-xl relative w-full max-w-md mx-auto bg-secondary-default shadow-lg">
      {/* Imagen responsiva con altura máxima */}
      <img
        src={img}
        alt={title}
        className="w-full max-h-32 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h2 className="font-semibold text-white text-lg truncate">
          {truncatedTitle}
        </h2>
        <div className="mt-2">
          <Pill
            label={category}
            onClick={() => {}} // Opcional, dejar vacío si no es necesario
          />
        </div>
        {/* Botón Show more como Link */}
        <div className="mt-4">
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
