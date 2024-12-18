const ListCard = ({ list }) => {
  return (
    <div className="bg-secondary-default text-white rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold">{list.name}</h3>
      <p className="text-sm text-gray-400">{list.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        {list.items.length} {list.items.length === 1 ? "item" : "items"}
      </p>
    </div>
  );
};

export default ListCard;
