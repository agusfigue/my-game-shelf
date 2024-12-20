import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGamesStore from "./stores/useGamesStore";
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

    // Navegar y pasar el estado del mensaje
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

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setBottomMessage({ isVisible: false, message: "", type: "info" });
    }, 3000);
  };

  return (
    <section className="mt-12 mb-12 min-h-[calc(100vh-6rem)] p-4 bg-secondary-dark text-white">
      <BackButton to="/lists" />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">{selectedList?.name}</h2>
        <IconButton
          icon="more_vert"
          onClick={() => setShowOptionsModal(true)}
        />
      </div>
      <p className="mb-4 text-gray-400">{selectedList?.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedList?.items.length > 0 ? (
          selectedList.items.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onRemove={() => handleRemoveGame(game)}
            />
          ))
        ) : (
          <Message variant="info" message="No games in this list." />
        )}
      </div>
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
        onSaveSuccess={handleSaveSuccess} // Pasar el manejador de éxito
      />
      {bottomMessage.isVisible && (
        <Message
          variant={bottomMessage.type}
          message={bottomMessage.message}
          isFixed={true}
        />
      )}
    </section>
  );
};

export default ListDetails;