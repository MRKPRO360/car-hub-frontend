function HomeButton({
  text,
  type,
  disabled,
}: {
  text: string;
  type: 'light' | 'blue';
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={`disabled:bg-gray-400 disabled:cursor-not-allowed inline-block sm:mt-3 text-center md:text-xl rounded-sm bg-${type} ${
        type === 'blue' && 'text-light'
      } hover:shadow-lg shadow-ymn-blue/50 transform transition duration-300  text-blue px-3 py-1 cursor-pointer`}
    >
      {text}
    </button>
  );
}

export default HomeButton;
