const Search = (props) => {
  const { placeholder, onChange, value } = props;
  return (
    <div className="mb-4 bg-secondary-default font-medium rounded-full px-4 py-2 text-sm w-full flex items-center gap-2 text-white">
      <span className="material-symbols-rounded">search</span>
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="focus-visible:outline-none bg-transparent"
      />
    </div>
  );
};

export default Search;
