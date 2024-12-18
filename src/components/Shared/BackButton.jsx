import { useNavigate } from "react-router-dom";

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="fixed top-1 left-2 z-50 bg-primary hover:bg-primary-dark text-white rounded-full p-2 shadow-lg"
      aria-label="Back"
    >
      <span className="material-icons text-xl">arrow_back</span>
    </button>
  );
};

export default BackButton;
