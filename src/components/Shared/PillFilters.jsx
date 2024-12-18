//

const PillFilters = ({ label, onClick, selected }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-3 text-sm font-medium capitalize h-10 min-w-[80px] max-w-[120px] overflow-hidden whitespace-nowrap ${
        selected
          ? "bg-primary-default text-black"
          : "bg-secondary-default text-white"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PillFilters;
