import { useState, useEffect } from "react";

const Lists = () => {
  const [lists, setLists] = useState([]);

  // Cargar las listas desde el localStorage al montar el componente
  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("lists")) || [];
    if (storedLists.length === 0) {
      const defaultList = [
        {
          id: 1,
          name: "My First List",
          description: "This is my first list.",
        },
      ];
      setLists(defaultList);
      localStorage.setItem("lists", JSON.stringify(defaultList));
    } else {
      setLists(storedLists);
    }
  }, []);

  return (
    <section className="mt-12 mb-12 min-h-[calc(100vh-6rem)] bg-secondary-dark p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">Your Lists</h2>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.map((list) => (
          <div
            key={list.id}
            className="bg-secondary-default text-white rounded-lg p-4 shadow-md"
          >
            <h3 className="text-lg font-semibold">{list.name}</h3>
            <p className="text-sm text-gray-400">{list.description}</p>
          </div>
        ))}
      </div>
      {lists.length === 0 && (
        <p className="text-gray-400 text-center mt-4">
          You haven&apos;t created any lists yet.
        </p>
      )}
    </section>
  );
};

export default Lists;
