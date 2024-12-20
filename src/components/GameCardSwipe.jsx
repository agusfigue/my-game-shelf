import { Link } from "react-router-dom";
import IconButtonText from "./Shared/IconButtonText";
import Pill from "./Shared/Pill";

const GameCardSwipe = (props) => {
  const { id, title, genres, img, rating } = props;

  return (
    <div className="relative w-full max-w-screen-lg mx-auto rounded-xl overflow-hidden shadow-lg">
      <img
        src={img}
        alt={title}
        className="w-full sm:max-h-72 md:max-h-96 object-cover"
      />

      <div className="absolute top-3 right-4 z-10">
        <Pill
          label={`★ ${rating || "N/A"}`}
          color="bg-yellow-300"
          textColor="text-black"
        />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 pb-1 px-3 pt-40 text-white"
        style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 1), transparent)",
        }}
      >
        <h2 className="font-semibold text-xl mb-1 truncated">{title}</h2>

        <div className="flex flex-wrap gap-2 mb-3">
          {genres.map((genre, index) => (
            <Pill
              key={index}
              label={genre}
              color="bg-cyan-400"
              textColor="text-black"
            />
          ))}
        </div>

        <div className="mt-2">
          <Link to={`/game/${id}`}>
            <IconButtonText
              icon="visibility"
              text="See More"
              color="bg-white"
              onClick={() => {}}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCardSwipe;
