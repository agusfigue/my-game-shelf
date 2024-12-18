import { useState } from "react";
import IconButtonText from "./IconButtonText";

const CreateListModal = ({ isOpen, onClose, onBack }) => {
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateList = () => {
    if (!listName.trim()) {
      alert("List name is required");
      return;
    }
    // Lógica para agregar una nueva lista
    console.log("List created:", { listName, description });
    onClose(); // Cerrar esta modal después de crear la lista
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
        <h2 className="text-lg font-bold mb-4">Create New List</h2>
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

        {/* Botón para crear la lista */}
        <IconButtonText
          icon="edit"
          text="Create"
          color="bg-white"
          onClick={handleCreateList}
        />

        {/* Botón para volver atrás */}
        <IconButtonText
          icon=""
          text="Cancel"
          color="bg-red-500"
          onClick={onBack}
        />
      </div>
    </div>
  );
};

export default CreateListModal;
