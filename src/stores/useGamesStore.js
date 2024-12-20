import { create } from "zustand";

const useGamesStore = create((set) => ({
    games: [],
    allGames: [],
    discarded: JSON.parse(localStorage.getItem("discarded")) || [],
    customLists: JSON.parse(localStorage.getItem("customLists")) || [], // Cambiado para no cargar listas por defecto
    filters: {
        search: "",
        category: "all",
        rating: null,
    },

    setCustomLists: (updatedLists) =>
        set(() => {
            localStorage.setItem("customLists", JSON.stringify(updatedLists));
            return { customLists: updatedLists };
        }),

    setDiscarded: (updatedDiscarded) =>
        set(() => {
            localStorage.setItem("discarded", JSON.stringify(updatedDiscarded));
            return { discarded: updatedDiscarded };
        }),

    setSearchQuery: (query) =>
        set((state) => ({
            filters: { ...state.filters, search: query },
        })),

    fetchGames: async () => {
        const apiKey = "fb576c6794d14ea39e30edc82b8561a4";
        const totalPages = 20;
        const pageSize = 50;
        let allFetchedGames = [];

        try {
            for (let page = 1; page <= totalPages; page++) {
                const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=${pageSize}&page=${page}`;
                const res = await fetch(url);
                const data = await res.json();
                allFetchedGames = [...allFetchedGames, ...data.results];
            }

            set((state) => ({
                allGames: allFetchedGames,
                games: allFetchedGames.filter((game) => {
                    const { search, category, rating } = state.filters;

                    const matchesSearch = search
                        ? game.name.toLowerCase().includes(search.toLowerCase())
                        : true;

                    const matchesCategory =
                        category === "all" ||
                        game.genres.some((genre) => genre.name.toLowerCase() === category);

                    const matchesRating =
                        rating === null ||
                        (game.rating >= rating[0] && game.rating <= rating[1]);

                    const isInLists = state.customLists.some((list) =>
                        list.items.some((item) => item.id === game.id)
                    );

                    const isDiscarded = state.discarded.some(
                        (discardedGame) => discardedGame.id === game.id
                    );

                    return matchesSearch && matchesCategory && matchesRating && !isInLists && !isDiscarded;
                }),
            }));
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    },

    applyFilters: () =>
        set((state) => {
            const { search, category, rating } = state.filters;

            const filteredGames = state.allGames.filter((game) => {
                const matchesSearch = search
                    ? game.name.toLowerCase().includes(search.toLowerCase())
                    : true;

                const matchesCategory =
                    category === "all" ||
                    game.genres.some((genre) => genre.name.toLowerCase() === category);

                const matchesRating =
                    rating === null ||
                    (game.rating >= rating[0] && game.rating <= rating[1]);

                const isInLists = state.customLists.some((list) =>
                    list.items.some((item) => item.id === game.id)
                );

                const isDiscarded = state.discarded.some(
                    (discardedGame) => discardedGame.id === game.id
                );

                return matchesSearch && matchesCategory && matchesRating && !isInLists && !isDiscarded;
            });

            return { games: filteredGames };
        }),

    discardGame: (game) =>
        set((state) => {
            const updatedDiscarded = [...state.discarded, game];
            localStorage.setItem("discarded", JSON.stringify(updatedDiscarded));

            return {
                discarded: updatedDiscarded,
                games: state.games.filter((g) => g.id !== game.id),
            };
        }),

    addToList: (listName, game) =>
        set((state) => {
            const updatedLists = state.customLists.map((list) =>
                list.name === listName
                    ? { ...list, items: [...list.items, game] }
                    : list
            );

            localStorage.setItem("customLists", JSON.stringify(updatedLists));

            return {
                customLists: updatedLists,
                games: state.games.filter((g) => g.id !== game.id),
            };
        }),

    addList: (newList) =>
        set((state) => {
            const updatedLists = [...state.customLists, newList];
            localStorage.setItem("customLists", JSON.stringify(updatedLists));
            return { customLists: updatedLists };
        }),
}));

export default useGamesStore;
