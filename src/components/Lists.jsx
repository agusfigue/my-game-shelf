import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGamesStore from "../stores/useGamesStore";
import ListCard from "./Shared/ListCard";
import Message from "./Shared/Message";
import Search from "./Shared/Search";
import IconButton from "./Shared/IconButton";
import CreateListModal from "./Shared/CreateListModal";

const Lists = () => {
  const { customLists } = useGamesStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [messageFromState, setMessageFromState] = useState(location.state);

  useEffect(() => {
    if (messageFromState) {
      const timer = setTimeout(() => {
        setMessageFromState(null);
        navigate(".", { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messageFromState, navigate]);

  const handleListCreated = (messageDetails) => {
    setMessageFromState(messageDetails);
    setIsModalOpen(false);
  };

  const filteredLists = customLists.filter((list) =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="mt-12 mb-14 min-h-[calc(100vh-6rem)] bg-secondary-dark p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-bold">Your Lists</h2>
        <IconButton icon="add" onClick={() => setIsModalOpen(true)} />
      </div>
      <Search
        placeholder="Search for a list..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLists.length > 0 ? (
          filteredLists.map((list, index) => (
            <Link
              to={`/lists/${encodeURIComponent(list.name)}`}
              key={list.id || `list-${index}`}
            >
              <ListCard list={list} />
            </Link>
          ))
        ) : (
          <Message
            variant="info"
            message={
              searchQuery
                ? "No lists match your search."
                : "You haven't created any lists yet."
            }
          />
        )}
      </div>

      <CreateListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onListCreated={handleListCreated}
      />

      {messageFromState && (
        <Message
          variant={messageFromState.type}
          message={messageFromState.message}
          isFixed={true}
        />
      )}
    </section>
  );
};

export default Lists;
