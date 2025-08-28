import { FaFacebook } from 'react-icons/fa6';

function FBLoginBtn() {
  const handleFacebookLogin = async () => {
    window.location.href = import.meta.env.VITE_FACEBOOK_REDIRECT;
  };

  console.log(import.meta.env.VITE_FACEBOOK_REDIRECT);

  return (
    <button
      className="min-w-[200px] max-w-[400px] flex items-center justify-center mb-6 md:mb-0 border border-primary text-sm text-gray-500 py-2 px-5 gap-1 rounded-md tracking-wide font-medium cursor-pointer transition ease-in duration-500"
      type="button"
      onClick={handleFacebookLogin}
    >
      <FaFacebook className="text-2xl text-blue-600" />
      <span>Facebook</span>
    </button>
  );
}

export default FBLoginBtn;
