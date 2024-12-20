import { useState } from "react";
import useGamesStore from "../stores/useGamesStore";
import IconButtonText from "./IconButtonText";
import ListCardModal from "./ListCardModal";
import CreateListModal from "./CreateListModal";
import IconButton from "./IconButton";
import Message from "./Message";

const AddToListModal = ({ isOpen, onClose, currentGame, onGameAdded }) => {
  const { customLists, addToList } = useGamesStore();
  const [showCreateListModal, setShowCreateListModal] = useState(false);

  const handleAddToList = (listName) => {
    if (addToList && typeof addToList === "function") {
      addToList(listName, currentGame);

      // Notificar al componente padre que el juego fue agregado
      if (onGameAdded) {
        onGameAdded(
          `${currentGame.name} has been added to the list "${listName}" successfully.`
        );
      }
    }
    onClose();
  };

  const handleOpenCreateListModal = () => {
    setShowCreateListModal(true);
  };

  const handleCloseCreateListModal = () => {
    setShowCreateListModal(false);
  };

  if (!isOpen && !showCreateListModal) return null;

  return (
    <>
      {isOpen && !showCreateListModal && (
        <div
          className="fixed inset-0 text-white bg-black bg-opacity-80 flex justify-center items-end z-50"
          onClick={onClose}
        >
          <div
            className="bg-secondary-dark rounded-t-lg p-4 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Add to</h2>
              <IconButton icon="close" onClick={onClose} />
            </div>
            <div className="mb-4">
              {customLists.length > 0 ? (
                customLists.map((list) => (
                  <ListCardModal
                    key={list.id}
                    list={list}
                    onClick={() => handleAddToList(list.name)}
                  />
                ))
              ) : (
                <>
                  <Message
                    variant="info"
                    message="No lists available. Create a new list to start adding games!"
                    isFixed={false} // No fijo, permanece visible
                  />
                </>
              )}
            </div>
            <IconButtonText
              icon="add"
              text="Create list"
              color="bg-white"
              onClick={handleOpenCreateListModal}
            />
          </div>
        </div>
      )}

      {showCreateListModal && (
        <CreateListModal
          isOpen={showCreateListModal}
          onClose={() => {
            handleCloseCreateListModal();
          }}
        />
      )}
    </>
  );
};

export default AddToListModal;
