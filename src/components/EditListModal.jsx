import { useState } from "react";
import IconButtonText from "./Shared/IconButtonText";
import useGamesStore from "./stores/useGamesStore";
import { useNavigate } from "react-router-dom";

const EditListModal = ({ isOpen, onClose, list }) => {
  const [listName, setListName] = useState(list.name);
  const [description, setDescription] = useState(list.description);
  const { customLists, setCustomLists } = useGamesStore();
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    if (!listName.trim()) {
      alert("List name is required");
      return;
    }

    const updatedLists = customLists.map((item) =>
      item.name === list.name ? { ...item, name: listName, description } : item
    );

    // Actualizar el estado global y el localStorage
    setCustomLists(updatedLists);
    localStorage.setItem("customLists", JSON.stringify(updatedLists));

    // Redirigir a la lista actualizada
    navigate(`/lists/${encodeURIComponent(listName)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 text-white bg-black bg-opacity-80 flex justify-center items-end z-50"
      onClick={onClose}
    >
      <div
        className="bg-secondary-dark rounded-t-lg p-4 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Edit List</h2>
        <input
          type="text"
          placeholder="List Name"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <IconButtonText
          icon="check"
          text="Save Changes"
          color="bg-white"
          onClick={handleSaveChanges}
        />
        <IconButtonText
          icon="close"
          text="Cancel"
          color="bg-red-500"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default EditListModal;
