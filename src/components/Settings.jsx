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
    const defaultList = [
      {
        id: Date.now(),
        name: "Favorites",
        description:
          "This is your Favorites list. You can add games here, rename it, or delete it.",
        items: [],
      },
    ];

    setCustomLists(defaultList);
    localStorage.setItem("customLists", JSON.stringify(defaultList));
    applyFilters();

    showMessage(
      "All lists have been reset to the default Favorites list.",
      "warning"
    );
  };

  const handleResetDiscarded = () => {
    setDiscarded([]);
    localStorage.setItem("discarded", JSON.stringify([]));
    applyFilters();

    showMessage(
      "All discarded games have been reset and are now visible in the swipe.",
      "warning"
    );
  };

  return (
    <section className="mt-12 mb-12 min-h-[calc(100vh-6rem)] bg-secondary-dark p-4 text-white">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
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
        <Message
          message={message.text}
          variant={message.variant}
          isFixed={true}
        />
      )}
    </section>
  );
};

export default Settings;
