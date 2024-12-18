import { Link } from "react-router-dom";
import useGamesStore from "./stores/useGamesStore";
import ListCard from "./Shared/ListCard";
import Message from "./Shared/Message";

const Lists = () => {
  const { customLists } = useGamesStore();

  return (
    <section className="mt-12 mb-12 min-h-[calc(100vh-6rem)] bg-secondary-dark p-4">
      <h2 className="text-white text-xl font-bold mb-4">Your Lists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customLists.map((list, index) => (
          <Link
            to={`/lists/${encodeURIComponent(list.name)}`}
            key={list.id || `list-${index}`} // Respaldo con índice
          >
            <ListCard list={list} />
          </Link>
        ))}
      </div>

      {customLists.length === 0 && (
        <Message variant="info" message="You haven't created any lists yet." />
      )}
    </section>
  );
};

export default Lists;
