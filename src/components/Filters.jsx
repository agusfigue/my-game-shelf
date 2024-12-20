import PillFilters from "./Shared/PillFilters";
import Search from "./Shared/Search";
import IconButtonText from "./Shared/IconButtonText";

const Filters = ({
  genres = [],
  setSelectedCategory,
  selectedCategory,
  selectedRating,
  setSelectedRating,
  searchQuery,
  setSearchQuery,
  onHideFilters,
}) => {
  const ratingOptions = [
    { label: "All", range: null },
    { label: "Excellent", range: [3.75, 5] },
    { label: "Good", range: [2.5, 3.75] },
    { label: "Average", range: [1.25, 2.5] },
    { label: "Low", range: [0, 1.25] },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Search
        placeholder="Search games..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2">Genres</h4>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {genres.length > 0 ? (
            genres.map((category, i) => (
              <PillFilters
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

      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2">Rating</h4>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap">
          {ratingOptions.map((option, i) => (
            <PillFilters
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

      <div className="mt-4">
        <IconButtonText
          icon="visibility_off"
          text="Hide Filters"
          color="bg-white"
          onClick={onHideFilters}
        />
      </div>
    </div>
  );
};

export default Filters;
