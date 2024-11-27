//

const Pill = (props) => {
  const { label, onClick, selected } = props;

  return (
    <button
      className={`rounded-lg py-1 px-3 text-sm font-medium capitalize ${
        selected
          ? "bg-green-default text-white"
          : "bg-blue-dark text-gray-500 border-solid border-blue-default border-2"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Pill;
