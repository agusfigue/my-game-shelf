const Pill = ({ label, color, textColor }) => {
  return (
    <button
      className={`${color} ${textColor} inline-flex items-center justify-center rounded-lg px-2 py-1 text-xs font-medium capitalize whitespace-nowrap`}
    >
      {label}
    </button>
  );
};

export default Pill;
