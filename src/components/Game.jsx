//

import { Link } from "react-router-dom";

const Game = (props) => {
  const {
    id,
    title,
    category,
    img = "https://thecapecurrent.com/wp-content/uploads/2023/07/play-volley.jpg",
  } = props;
  return (
    <Link className="rounded-xl relative" to={`game/${id}`}>
      <img src={img} alt={title} className="rounded-t-xl" />
      <div className="absolute bottom-3 left-2 text-white">
        <h2 className="font-semibold">{title}</h2>
        <p className="rounded-md text-xs capitalize bg-green-500 w-min px-2 py-1 mt-1">
          {category}
        </p>
      </div>
    </Link>
  );
};

export default Game;
