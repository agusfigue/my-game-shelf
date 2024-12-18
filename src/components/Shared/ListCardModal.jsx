const ListCardModal = ({ list, onClick }) => {
  return (
    <div
      className="p-3 my-2 bg-secondary-default rounded-lg cursor-pointer hover:bg-primary text-white"
      onClick={onClick}
    >
      <h3 className="font-semibold">{list.name}</h3>
    </div>
  );
};

export default ListCardModal;
