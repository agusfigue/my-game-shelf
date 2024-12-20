const PillFilters = ({ label, onClick, selected }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium capitalize 
        ${
          selected
            ? "bg-primary-default text-black"
            : "bg-secondary-default text-white"
        }
        h-10 whitespace-nowrap`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PillFilters;
