import Cta from './shared/Cta';
import { useAppDispatch } from '../redux/hooks';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { toast } from 'sonner';
import { FieldValues, useForm } from 'react-hook-form';
import { verifyToken } from '../utils/verifyToken';
import { IUser } from '../types';
import { setUser } from '../redux/features/auth/authSlice';
import { Link, useNavigate } from 'react-router';

import GoogleLoginBtn from './shared/GoogleLoginBtn';
import FBLoginBtn from './shared/FBLoginBtn';
import loginImg from '../assets/images/login.png';
import { CircleAlert } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging in...');
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.token) as IUser;
      dispatch(setUser({ user: user, token: res.data.token }));

      toast.success('Logged in', { id: toastId, duration: 2000 });
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="w-1/2 hidden lg:block ">
        <img
          src={loginImg}
          // src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Placeholder Image"
          className="block object-cover w-full h-full"
        />
      </div>

      <div className="lg:py-36 lg:px-20 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* PROVIDED ROLE */}

          <h3 className="mb-1 text-lg">Choose one of account</h3>
          <div className="flex items-center gap-x-4 mb-4">
            <button
              onClick={async () => {
                setValue('email', 'nill@jane.com');
                setValue('password', 'admin12345');
                await new Promise((res) => setTimeout(res, 100));
                handleSubmit(onSubmit)();
              }}
              type="button"
            >
              <Cta
                size="sm"
                className="bg-indigo-500 hover:bg-indigo-600"
                text="Admin"
              ></Cta>
            </button>
            <button
              type="button"
              onClick={async () => {
                setValue('email', 'marrycooper@gmail.com');
                setValue('password', 'user12345');
                await new Promise((res) => setTimeout(res, 100));
                handleSubmit(onSubmit)();
              }}
            >
              <Cta
                className="bg-cyan-500 hover:bg-cyan-600"
                size="sm"
                text="User"
              ></Cta>
            </button>
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-semibold text-base"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@hotmail.com"
              className={`w-full border rounded-md py-2 px-3 focus:outline-none ${
                errors.email
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {typeof errors.email.message === 'string'
                  ? errors.email.message
                  : 'Invalid email'}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-semibold text-base"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full border rounded-md py-2 px-3 focus:outline-none ${
                errors.password
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {typeof errors.password.message === 'string'
                  ? errors.password.message
                  : 'Invalid password'}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="text-primary"
              {...register('remember')}
            />
            <label htmlFor="remember" className="text-gray-700 ml-2">
              Remember Me
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-primary">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full">
            <Cta text="Login" className="w-full" />
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Signup
            </Link>
          </p>

          <Link className="underline" to="/">
            Back to Home
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-2 my-5">
          <span className="h-px w-full bg-gray-200"></span>
          <span className="text-gray-200 font-normal">or</span>
          <span className="h-px w-full bg-gray-200"></span>
        </div>
        <div className="flex justify-center gap-5 w-full">
          <GoogleLoginBtn />
          <FBLoginBtn />
        </div>
      </div>
    </div>
  );
}

export default Login;
