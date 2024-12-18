//

const Pill = ({ label, onClick }) => {
  return (
    <button
      className={`bg-primary-default text-secondary-dark inline-flex items-center justify-center rounded-lg px-2 py-1 text-xs font-medium capitalize whitespace-nowrap`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Pill;
