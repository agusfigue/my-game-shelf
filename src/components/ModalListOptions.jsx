import IconButton from "./Shared/IconButton";
import IconButtonText from "./Shared/IconButtonText";

const ModalListOptions = ({ isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 text-white bg-black bg-opacity-80 flex justify-center items-end z-50"
      onClick={onClose}
    >
      <div
        className="bg-secondary-dark rounded-t-lg p-4 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Options</h2>
          <IconButton icon="close" onClick={onClose} />
        </div>
        <IconButtonText
          icon="edit"
          text="Edit List"
          color="bg-white"
          onClick={onEdit}
        />
        <IconButtonText
          icon="delete"
          text="Delete List"
          color="bg-red-500"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default ModalListOptions;
