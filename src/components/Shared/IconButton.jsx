const IconButton = (props) => {
  const { icon, onClick } = props;

  return (
    <button className="flex items-center justify-center" onClick={onClick}>
      <i className="material-symbols-rounded text-white text-2xl">{icon}</i>
    </button>
  );
};

export default IconButton;
