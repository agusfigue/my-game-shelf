import useGamesStore from "../stores/useGamesStore";
import IconButtonText from "./IconButtonText";

const Modal = ({ isOpen, onClose, currentGame }) => {
  const { customLists, addToList } = useGamesStore();

  if (!isOpen) return null;

  const handleAddToList = (listName) => {
    addToList(listName, currentGame);
    onClose(); // Cerrar el modal después de agregar
  };

  return (
    <div
      className="fixed inset-0 text-white bg-black bg-opacity-80 flex justify-center items-end z-50"
      onClick={onClose}
    >
      <div
        className="bg-secondary-dark rounded-t-lg p-4 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Add to List</h2>
        {customLists.map((list) => (
          <div
            key={list.name}
            className="p-4 mb-2 bg-secondary-default rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => handleAddToList(list.name)}
          >
            <h3 className="font-semibold">{list.name}</h3>
            <p className="text-sm">{list.description}</p>
          </div>
        ))}
        <IconButtonText
          icon="add" // Icono de flecha hacia abajo
          text="Add list" // Texto del botón
          color="bg-white" // Color de fondo
          onClick={() => {}} // No es necesario para enlaces
        />
        <IconButtonText
          icon="block" // Icono de flecha hacia abajo
          text="Cancel" // Texto del botón
          color="bg-red-500" // Color de fondo
          onClick={() => {}} // No es necesario para enlaces
        />
      </div>
    </div>
  );
};

export default Modal;
