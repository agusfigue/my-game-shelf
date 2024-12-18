import { Link } from "react-router-dom";
import IconButtonText from "./Shared/IconButtonText";

const GameCardSwipe = (props) => {
  const { id, title, category, img } = props;

  return (
    <div className="rounded-xl relative">
      <img src={img} alt={title} className="rounded-t-xl" />
      <div className="w-full bottom-0 left-0 p-3 rounded-b-xl text-white bg-secondary-default">
        <h2 className="font-semibold">{title}</h2>
        <p className="rounded-md text-xs capitalize bg-white w-min px-2 py-1 mt-1 text-black">
          {category}
        </p>
        {/* Botón Show more como Link */}
        <Link to={`/game/${id}`}>
          <IconButtonText
            icon="visibility" // Icono de flecha hacia abajo
            text="See More" // Texto del botón
            color="bg-primary" // Color de fondo
            onClick={() => {}} // No es necesario para enlaces
          />
        </Link>
      </div>
    </div>
  );
};

export default GameCardSwipe;
