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
    <section className="flex justify-center min-h-screen bg-secondary-dark">
      <div className="w-full max-w-screen-lg mt-12 mb-14 px-4 md:px-8 p-4 bg-secondary-dark">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-2xl font-bold">Your Lists</h2>
          <IconButton icon="add" onClick={() => setIsModalOpen(true)} />
        </div>
        <Search
          placeholder="Search for a list..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {filteredLists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLists.map((list, index) => (
              <Link
                to={`/lists/${encodeURIComponent(list.name)}`}
                key={list.id || `list-${index}`}
              >
                <ListCard list={list} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full mt-4">
            <Message
              variant="info"
              isFixed={false}
              message={
                searchQuery
                  ? "No lists match your search."
                  : "You haven't created any lists yet."
              }
            />
          </div>
        )}

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
      </div>
    </section>
  );
};

export default Lists;
