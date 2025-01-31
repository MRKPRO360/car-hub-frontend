import { FaFacebook, FaGoogle, FaLock, FaTwitter } from 'react-icons/fa';
import loginBg from '../assets/login.jpg';
import CarInput from '../components/form/CarInput';
import Button from './shared/Button';
import CarForm from '../components/form/CarForm';
import { MdEmail } from 'react-icons/md';
import Checkbox from '../components/form/CheckBox';
import { Link } from 'react-router';

function Login() {
  const onSubmit = (data) => {
    console.log('Form submitted', data);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(13, 27, 42, 0.65), rgba(13, 27, 42, 0.8)), url(${loginBg})`,
      }}
      className="w-full pt-25 min-h-screen bg-cover bg-center bg-no-repeat pb-10"
    >
      <div className="bg-light mx-auto max-w-96 relative sm:max-w-[450px] rounded-sm shadow-2xl shadow-blue px-5 md:px-0">
        <div
          style={{
            backgroundImage: `linear-gradient(to right, rgba(13, 27, 42, .95), rgba(13, 27, 42, 1))`,
            width: 'calc(100% - 40px)',
            position: 'absolute',
            top: '-2%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className="text-light z-30 rounded-md"
        >
          <div>
            <h3 className="text-center text-3xl font-semibold mt-5">Login</h3>
            <div
              style={{
                width: 'calc(100% - 200px)',
              }}
              className="flex itmes-center py-7 justify-between mx-auto text-3xl sm:text-2xl"
            >
              <FaGoogle />
              <FaFacebook />
              <FaTwitter />
            </div>
          </div>
        </div>
        <div className="pt-20">
          <CarForm onSubmit={onSubmit}>
            {(methods) => (
              <>
                <CarInput
                  type="email"
                  name="email"
                  label="Email"
                  icon={<MdEmail />}
                  register={methods.register}
                  error={methods.formState.errors.email}
                />
                <CarInput
                  type="password"
                  name="password"
                  label="Password"
                  icon={<FaLock />}
                  register={methods.register}
                  error={methods.formState.errors.password}
                />

                <div>
                  <Checkbox text="Remember Me" />
                  <div className="flex items-center gap-4 w-full md:w-[80%] mx-auto mt-8">
                    <Button type="submit" size="lg" text="Login" />
                    <Button variant="outlined" text="Forget Password?" />
                  </div>
                </div>

                <p className="text-blue/80 w-full md:w-[80%] relative mx-auto pb-5 mt-7 ">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue font-semibold ">
                    Signup
                  </Link>
                </p>
              </>
            )}
          </CarForm>
        </div>
      </div>
    </div>
  );
}

export default Login;
