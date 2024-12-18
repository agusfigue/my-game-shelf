import IconButtonText from "./Shared/IconButtonText";

const ModalListOptions = ({ isOpen, onClose, onEdit, onDelete }) => {
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
        <h2 className="text-lg font-bold mb-4">Options</h2>
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
