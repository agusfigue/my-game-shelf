import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGamesStore from "./stores/useGamesStore";
import GameCard from "./Shared/GameCard";
import BackButton from "./Shared/BackButton";
import Message from "./Shared/Message";
import IconButton from "./Shared/IconButton";
import ModalListOptions from "./ModalListOptions.jsx"; // Nueva modal
import EditListModal from "./EditListModal"; // Modal para editar lista

const ListDetails = () => {
  const { listName } = useParams();
  const navigate = useNavigate();
  const { customLists, setCustomLists } = useGamesStore();
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const selectedList = customLists.find(
    (list) => list.name === decodeURIComponent(listName)
  );

  const handleDeleteList = () => {
    const updatedLists = customLists.filter(
      (list) => list.name !== selectedList.name
    );
    setCustomLists(updatedLists);
    alert("List deleted successfully");
    navigate("/lists");
  };

  if (!selectedList) {
    return (
      <div className="text-center text-white mt-12">
        <BackButton to="/lists" /> {/* Botón de regreso */}
        <h2>List not found</h2>
      </div>
    );
  }

  return (
    <section className="mt-12 mb-12 min-h-[calc(100vh-6rem)] p-4 bg-secondary-dark text-white">
      <BackButton to="/lists" /> {/* Botón de regreso */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">{selectedList.name}</h2>
        <IconButton
          icon="more_vert"
          onClick={() => setShowOptionsModal(true)} // Abre la modal de opciones
          className="text-white"
        />
      </div>
      <p className="mb-4 text-gray-400">{selectedList.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedList.items.length > 0 ? (
          selectedList.items.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        ) : (
          <Message variant="info" message="No games in this list." />
        )}
      </div>
      {/* Modal para opciones */}
      <ModalListOptions
        isOpen={showOptionsModal}
        onClose={() => setShowOptionsModal(false)}
        onEdit={() => {
          setShowOptionsModal(false);
          setShowEditModal(true);
        }}
        onDelete={handleDeleteList}
      />
      {/* Modal para editar lista */}
      <EditListModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        list={selectedList}
      />
    </section>
  );
};

export default ListDetails;
