const Pill = ({ label, color, textColor }) => {
  return (
    <button
      className={`${color} ${textColor} inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-medium capitalize whitespace-nowrap`}
    >
      {label}
    </button>
  );
};

export default Pill;
