import useGamesStore from "./stores/useGamesStore";
import IconButtonText from "./Shared/IconButtonText";

const Settings = () => {
  const {
    setCustomLists,
    setFavorites,
    setDiscarded,
    setGames,
    allGames,
    fetchGames,
  } = useGamesStore();

  // Resetear las listas y favoritos al estado inicial
  const handleResetListsAndFavorites = () => {
    const defaultList = [
      {
        id: Date.now(), // ID único
        name: "My First List by Default",
        description:
          "This is my first list. You can add games here, change my name or just delete me.",
        items: [],
      },
    ];

    setCustomLists(defaultList);
    setFavorites([]);
    localStorage.setItem("customLists", JSON.stringify(defaultList));
    localStorage.setItem("favorites", JSON.stringify([]));

    alert("Lists and favorites have been reset to default.");
  };

  // Resetear juegos y listas (swipe desde cero)
  const handleResetSwipe = async () => {
    const defaultList = [
      {
        id: Date.now(), // ID único
        name: "My First List by Default",
        description:
          "This is my first list. You can add games here, change my name or just delete me.",
        items: [],
      },
    ];

    setCustomLists(defaultList);
    setFavorites([]);
    setDiscarded([]);
    localStorage.setItem("customLists", JSON.stringify(defaultList));
    localStorage.setItem("favorites", JSON.stringify([]));
    localStorage.setItem("discarded", JSON.stringify([]));

    await fetchGames();
    setGames(allGames);

    alert("All data has been reset. Swipe from the beginning!");
  };

  return (
    <section className="mt-12 mb-12 min-h-[calc(100vh-6rem)] bg-secondary-dark p-4 text-white">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-4">
        {/* Botón para resetear listas y favoritos */}
        <IconButtonText
          icon="restart_alt"
          text="Reset Lists and Favorites"
          color="bg-red-500"
          onClick={handleResetListsAndFavorites}
        />

        {/* Botón para resetear el swipe */}
        <IconButtonText
          icon="refresh"
          text="Reset Swipe"
          color="bg-cyan-500"
          onClick={handleResetSwipe}
        />
      </div>
    </section>
  );
};

export default Settings;
