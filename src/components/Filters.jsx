import Pill from "./Shared/Pill";

const Filters = ({
  genres = [], // Valor por defecto para evitar errores
  setSelectedCategory,
  selectedCategory,
  selectedRating,
  setSelectedRating,
}) => {
  const ratingOptions = [
    { label: "All", range: null },
    { label: "Excellent", range: [3.75, 5] },
    { label: "Good", range: [2.5, 3.75] },
    { label: "Average", range: [1.25, 2.5] },
    { label: "Low", range: [0, 1.25] },
  ];

  return (
    <div>
      {/* Filtro por género */}
      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2">Genres</h4>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {genres.length > 0 ? (
            genres.map((category, i) => (
              <Pill
                key={i}
                label={category}
                onClick={() => setSelectedCategory(category)}
                selected={category === selectedCategory}
              />
            ))
          ) : (
            <p className="text-gray-400">No genres found</p>
          )}
        </div>
      </div>

      {/* Filtro por estrellas */}
      <div>
        <h4 className="text-white font-semibold mb-2">Rating</h4>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {ratingOptions.map((option, i) => (
            <Pill
              key={i}
              label={option.label}
              onClick={() => setSelectedRating(option.range)}
              selected={
                selectedRating === null
                  ? option.range === null
                  : option.range &&
                    selectedRating?.[0] === option.range[0] &&
                    selectedRating?.[1] === option.range[1]
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
