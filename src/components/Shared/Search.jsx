const Search = (props) => {
  const { placeholder, onChange, value } = props;
  return (
    <div className="my-5 bg-secondary-default font-medium rounded-full p-2 w-full flex items-center gap-2 px-4 text-white text-sm">
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
