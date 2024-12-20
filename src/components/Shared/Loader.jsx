const Loader = () => {
  return (
    <div className="absolute top-12 bottom-12 left-0 right-0 bg-secondary-dark flex items-center justify-center z-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-75"></div>
    </div>
  );
};

export default Loader;
