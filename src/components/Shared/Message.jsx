const Message = (props) => {
  const { variant, message } = props;

  const variantsStyles = {
    success: "text-center bg-green-100 border-green-300 text-green-700",
    error: "text-center bg-red-100 border-red-300 text-red-700",
    warning: "text-center bg-yellow-100 border-yellow-300 text-yellow-700",
    info: "text-center bg-secondary-default text-white border",
  };

  return (
    <div>
      <div className={`rounded-md p-4 ${variantsStyles[variant]}`}>
        {message}
      </div>
    </div>
  );
};

export default Message;
