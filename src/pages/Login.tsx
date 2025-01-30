import loginBg from '../assets/login.jpg';

function Login() {
  console.log(loginBg);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(13, 27, 42, 0.45), rgba(13, 27, 42, 0.8)), url(${loginBg})`,
      }}
      className="w-full h-screen bg-cover bg-center bg-no-repeat"
    >
      Login
    </div>
  );
}

export default Login;
