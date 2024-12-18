import { create } from "zustand";

const useGamesStore = create((set) => ({
    games: [],
    allGames: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    discarded: JSON.parse(localStorage.getItem("discarded")) || [],
    currentIndex: 0,
    filters: { search: "", category: "all", rating: null },

    // Establecer juegos visibles
    setGames: (games) => set({ games }),

    // Actualizar el índice actual
    setCurrentIndex: (index) => set({ currentIndex: index }),

    // Fetch inicial de juegos desde la API
    fetchGames: async () => {
        const apiKey = "fb576c6794d14ea39e30edc82b8561a4";
        const totalPages = 1;
        const pageSize = 10;
        let allFetchedGames = [];

        try {
            for (let page = 1; page <= totalPages; page++) {
                const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=${pageSize}&page=${page}`;
                const res = await fetch(url);
                const data = await res.json();
                allFetchedGames = [...allFetchedGames, ...data.results];
            }

            // Cargar filtros desde localStorage si existen
            const savedFilters = JSON.parse(localStorage.getItem("filters")) || {
                search: "",
                category: "all",
                rating: null,
            };

            set((state) => ({
                allGames: allFetchedGames,
                filters: savedFilters,
                games: allFetchedGames.filter((game) => {
                    const matchesSearch = savedFilters.search
                        ? game.name.toLowerCase().includes(savedFilters.search.toLowerCase())
                        : true;
                    const matchesCategory =
                        savedFilters.category === "all" ||
                        game.genres.some((genre) =>
                            genre.name.toLowerCase() === savedFilters.category
                        );
                    const matchesRating =
                        savedFilters.rating === null ||
                        (game.rating >= savedFilters.rating[0] &&
                            game.rating <= savedFilters.rating[1]);
                    return (
                        matchesSearch &&
                        matchesCategory &&
                        matchesRating &&
                        !state.discarded.some(
                            (discardedGame) => discardedGame.id === game.id
                        )
                    );
                }),
            }));
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    },


    // Aplicar filtros
    applyFilters: () =>
        set((state) => {
            const { search, category, rating } = state.filters;

            // Guardar los filtros actuales en localStorage
            localStorage.setItem("filters", JSON.stringify(state.filters));

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
                return matchesSearch && matchesCategory && matchesRating;
            });

            return {
                games: filteredGames.filter(
                    (game) =>
                        !state.discarded.some((discardedGame) => discardedGame.id === game.id)
                ),
                currentIndex: 0,
            };
        }),

    // Agregar un juego a favoritos y guardar en localStorage
    addFavorite: (game) =>
        set((state) => {
            const updatedFavorites = [...state.favorites, game];
            const updatedDiscarded = [...state.discarded, game];

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            localStorage.setItem("discarded", JSON.stringify(updatedDiscarded));

            const filteredGames = state.allGames.filter((g) => {
                const isDiscarded = updatedDiscarded.some((discardedGame) => discardedGame.id === g.id);
                const matchesSearch = state.filters.search
                    ? g.name.toLowerCase().includes(state.filters.search.toLowerCase())
                    : true;
                const matchesCategory =
                    state.filters.category === "all" ||
                    g.genres.some((genre) => genre.name.toLowerCase() === state.filters.category);
                const matchesRating =
                    state.filters.rating === null ||
                    (g.rating >= state.filters.rating[0] && g.rating <= state.filters.rating[1]);

                return !isDiscarded && matchesSearch && matchesCategory && matchesRating;
            });

            return {
                favorites: updatedFavorites,
                discarded: updatedDiscarded,
                games: filteredGames,
                currentIndex: 0,
            };
        }),

    // Agregar un juego a descartados y guardar en localStorage
    discardGame: (game) =>
        set((state) => {
            const updatedDiscarded = [...state.discarded, game];
            localStorage.setItem("discarded", JSON.stringify(updatedDiscarded));
            return {
                discarded: updatedDiscarded,
                games: state.games.filter((g) => g.id !== game.id),
            };
        }),

    // ... Otros estados y funciones
    customLists: [
        {
            name: "My First List",
            description: "This is my first list.",
            games: [], // Juegos en la lista
        },
    ],

    // Agregar juego a una lista personalizada
    addToList: (listName, game) =>
        set((state) => ({
            customLists: state.customLists.map((list) =>
                list.name === listName
                    ? { ...list, games: [...list.games, game] }
                    : list
            ),
        })),
}));

export default useGamesStore;