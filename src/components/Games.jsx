//

import Game from "./Game";
import IconButton from "./Shared/IconButton";
import { categories } from "../helpers/constants";
import Search from "./Shared/Search";
import Pill from "./Shared/Pill";
import Loader from "./Shared/Loader";
import { useState, useEffect } from "react";

const Games = () => {
  const apiKey = "fb576c6794d14ea39e30edc82b8561a4";
  const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=50`;
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results);
      })
      .catch(() => {
        console.log("error");
        //setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [apiUrl]);

  /*
  const [noticias, setNoticias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/posts/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search]); 
  */

  return (
    <section className="p-4 bg-blue-dark">
      <header className="mt-2 mb-4 flex flex-wrap items-center">
        <IconButton icon="menu" onClick={() => {}}></IconButton>
        <img
          src="/logo.png"
          alt="MyGameShelf Logo"
          className="w-auto h-6 ml-4"
        />
      </header>
      <div>
        <Search placeholder="Buscar..." value="" onChange={() => {}} />
        <section className="flex gap-1 w-full overflow-y-auto no-scrollbar my-3">
          {categories.map((category, i) => (
            <Pill
              key={i}
              label={category}
              /*selected={selectedCategory === category}*/
              onClick={() => {}}
            />
          ))}
        </section>
      </div>
      {isLoading && <Loader />}
      <div className="flex flex-wrap gap-4">
        {games?.map((game) => (
          <Game
            key={game.id}
            id={game.id}
            title={game.name}
            category={game.genres[0].name}
          />
        ))}
      </div>
    </section>
  );
};

export default Games;
