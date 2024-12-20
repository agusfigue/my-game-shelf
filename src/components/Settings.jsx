import { useState } from "react";
import useGamesStore from "../stores/useGamesStore";
import IconButtonText from "./Shared/IconButtonText";
import Message from "./Shared/Message";

const Settings = () => {
  const { setCustomLists, setDiscarded, applyFilters } = useGamesStore();
  const [message, setMessage] = useState({ text: "", variant: "" });

  const showMessage = (text, variant) => {
    setMessage({ text, variant });
    setTimeout(() => setMessage({ text: "", variant: "" }), 3000);
  };

  const handleResetLists = () => {
    setCustomLists([]); // Ahora resetea a una lista vacía
    localStorage.removeItem("customLists"); // Elimina customLists de localStorage
    applyFilters();

    showMessage(
      "All lists have been reset. No lists are currently loaded.",
      "warning"
    );
  };

  const handleResetDiscarded = () => {
    setDiscarded([]);
    localStorage.removeItem("discarded");
    applyFilters();

    showMessage(
      "All discarded games have been reset and are now visible in the swipe.",
      "warning"
    );
  };

  return (
    <section className="flex justify-center items-start min-h-screen bg-secondary-dark text-white p-4">
      <div className="w-full max-w-screen-lg bg-secondary-dark rounded-lg mb-14 mt-14">
        <h1 className="text-white text-2xl font-bold mb-6">Settings</h1>
        <div className="space-y-4">
          <IconButtonText
            icon="restart_alt"
            text="Reset all lists"
            color="bg-white"
            onClick={handleResetLists}
          />
          <IconButtonText
            icon="delete"
            text="Reset discarded games"
            color="bg-red-500"
            onClick={handleResetDiscarded}
          />
        </div>
        {message.text && (
          <div className="mt-6">
            <Message
              message={message.text}
              variant={message.variant}
              isFixed={true}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Settings;
