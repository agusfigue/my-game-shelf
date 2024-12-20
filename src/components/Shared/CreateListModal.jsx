import { useState } from "react";
import IconButtonText from "./IconButtonText";
import IconButton from "./IconButton";
import useGamesStore from "../../stores/useGamesStore";
import Message from "./Message";

const CreateListModal = ({ isOpen, onClose, onListCreated }) => {
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addList, customLists } = useGamesStore();

  const handleCreateList = () => {
    if (!listName.trim()) {
      setErrorMessage("List name is required.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const nameExists = customLists.some(
      (list) => list.name.toLowerCase() === listName.toLowerCase()
    );
    if (nameExists) {
      setErrorMessage("A list with this name already exists.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    addList({
      id: Date.now(),
      name: listName,
      description: description || "No description provided.",
      items: [],
    });

    if (onListCreated) {
      onListCreated({
        message: "Your list has been created successfully.",
        type: "success",
      });
    }

    setListName("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {errorMessage && (
        <Message variant="error" message={errorMessage} isFixed={true} />
      )}
      <div
        className="fixed inset-0 text-white bg-black bg-opacity-80 flex justify-center items-end z-40"
        onClick={onClose}
      >
        <div
          className="bg-secondary-dark rounded-t-lg p-4 w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Create New List</h2>
            <IconButton icon="close" onClick={onClose} />
          </div>
          <input
            type="text"
            placeholder="List Name"
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <textarea
            placeholder="Description (optional)"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <IconButtonText
            icon="edit"
            text="Create"
            color="bg-white"
            onClick={handleCreateList}
          />
        </div>
      </div>
    </>
  );
};

export default CreateListModal;
