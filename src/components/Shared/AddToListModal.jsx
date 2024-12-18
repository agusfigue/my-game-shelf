import { useState } from "react";
import useGamesStore from "../stores/useGamesStore";
import IconButtonText from "./IconButtonText";
import ListCardModal from "./ListCardModal";
import CreateListModal from "./CreateListModal";

const AddToListModal = ({ isOpen, onClose, currentGame }) => {
  const { customLists, addToList } = useGamesStore(); // Asegúrate de que `addToList` esté definido correctamente
  const [showCreateListModal, setShowCreateListModal] = useState(false);

  // Manejar la adición del juego a la lista
  const handleAddToList = (listName) => {
    if (addToList && typeof addToList === "function") {
      addToList(listName, currentGame); // Lógica de adición
    } else {
      console.error(
        "addToList is not a function. Check useGamesStore definition."
      );
    }
    onClose(); // Cerrar esta modal después de agregar
  };

  // Abrir la modal para crear lista
  const handleOpenCreateListModal = () => {
    setShowCreateListModal(true);
  };

  // Cerrar la modal para crear lista
  const handleCloseCreateListModal = () => {
    setShowCreateListModal(false);
  };

  if (!isOpen && !showCreateListModal) return null;

  return (
    <>
      {/* Modal para agregar a listas existentes */}
      {isOpen && !showCreateListModal && (
        <div
          className="fixed inset-0 text-white bg-black bg-opacity-80 flex justify-center items-end z-50"
          onClick={onClose}
        >
          <div
            className="bg-secondary-dark rounded-t-lg p-4 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Add to List</h2>
            <div className="mb-4">
              {customLists.length > 0 ? (
                customLists.map((list) => (
                  <ListCardModal
                    key={list.id} // Cambiar a list.id en lugar de list.name
                    list={list}
                    onClick={() => handleAddToList(list.name)}
                  />
                ))
              ) : (
                <p className="text-gray-400">No lists available</p>
              )}
            </div>

            {/* Botones */}
            <div className="my-2">
              <IconButtonText
                icon="add"
                text="Add list"
                color="bg-white"
                onClick={handleOpenCreateListModal} // Abrir la modal para crear lista
              />
            </div>
            <div className="my-2">
              <IconButtonText
                icon=""
                text="Cancel"
                color="bg-red-500"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear nueva lista */}
      {showCreateListModal && (
        <CreateListModal
          isOpen={showCreateListModal}
          onClose={() => {
            handleCloseCreateListModal();
            onClose(); // Reabrir la modal principal
          }}
          onBack={() => {
            handleCloseCreateListModal();
          }}
        />
      )}
    </>
  );
};

export default AddToListModal;
