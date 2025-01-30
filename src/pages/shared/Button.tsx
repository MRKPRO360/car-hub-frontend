interface IButton {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'contained';
  type?: 'button' | 'submit';
}

function Button({ type, text, size, variant }: IButton) {
  return (
    <button
      type={type || 'button'}
      className={`text-base sm:text-lg cursor-pointer ${
        variant === 'outlined'
          ? 'text-blue '
          : 'bg-blue shadow-sm shadow-blue rounded-sm text-light'
      } ${size === 'lg' ? 'px-5 py-1' : 'px-3 py-1 '}`}
    >
      {text}
    </button>
  );
}

export default Button;
