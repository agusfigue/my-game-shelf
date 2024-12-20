import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGamesStore from "../stores/useGamesStore";
import BackButton from "./Shared/BackButton";
import IconButton from "./Shared/IconButton";
import ModalListOptions from "./ModalListOptions";
import EditListModal from "./EditListModal";
import GameCard from "./Shared/GameCard";
import Message from "./Shared/Message";

const ListDetails = () => {
  const { listName } = useParams();
  const navigate = useNavigate();
  const { customLists, setCustomLists, discarded, setDiscarded } =
    useGamesStore();
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bottomMessage, setBottomMessage] = useState({
    isVisible: false,
    message: "",
    type: "info",
  });

  const selectedList = customLists.find(
    (list) => list.name === decodeURIComponent(listName)
  );

  const handleDeleteList = () => {
    const updatedLists = customLists.filter(
      (list) => list.name !== selectedList.name
    );
    setCustomLists(updatedLists);

    navigate("/lists", {
      state: {
        message: `Your list "${listName}" has been deleted.`,
        type: "warning",
      },
    });
  };

  const handleRemoveGame = (game) => {
    const updatedDiscarded = [...discarded, game];
    setDiscarded(updatedDiscarded);

    const updatedLists = customLists.map((list) =>
      list.name === selectedList.name
        ? {
            ...list,
            items: list.items.filter((item) => item.id !== game.id),
          }
        : list
    );
    setCustomLists(updatedLists);

    setBottomMessage({
      isVisible: true,
      message: `${game.name} has been moved to discarded.`,
      type: "warning",
    });
  };

  const handleSaveSuccess = (message) => {
    setBottomMessage({
      isVisible: true,
      message,
      type: "success",
    });

    setTimeout(() => {
      setBottomMessage({ isVisible: false, message: "", type: "info" });
    }, 3000);
  };

  return (
    <section className="flex justify-center min-h-screen bg-secondary-dark">
      <div className="w-full max-w-screen-lg mt-12 mb-14 px-4 md:px-8 p-4 bg-secondary-dark text-white">
        <BackButton to="/lists" />
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-white text-2xl font-bold">
            {selectedList?.name}
          </h2>
          <IconButton
            icon="more_vert"
            onClick={() => setShowOptionsModal(true)}
          />
        </div>
        <p className="mb-7 text-gray-400">{selectedList?.description}</p>
        {selectedList?.items.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {selectedList.items.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() =>
                  navigate(`/game/${game.id}`, {
                    state: { hideActions: true, backTo: `/lists/${listName}` },
                  })
                }
                onRemove={() => handleRemoveGame(game)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full mt-8">
            <Message variant="info" message="No games in this list." />
          </div>
        )}
        <ModalListOptions
          isOpen={showOptionsModal}
          onClose={() => setShowOptionsModal(false)}
          onEdit={() => {
            setShowOptionsModal(false);
            setShowEditModal(true);
          }}
          onDelete={handleDeleteList}
        />
        <EditListModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          list={selectedList}
          onSaveSuccess={handleSaveSuccess}
        />
        {bottomMessage.isVisible && (
          <Message
            variant={bottomMessage.type}
            message={bottomMessage.message}
            isFixed={true}
          />
        )}
      </div>
    </section>
  );
};

export default ListDetails;
