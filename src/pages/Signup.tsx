import { FaLock, FaUser } from 'react-icons/fa';
import {
  MdEmail,
  MdLocalPhone,
  MdLocationOn,
  MdHome,
  MdError,
} from 'react-icons/md';
import { FieldValues, useForm } from 'react-hook-form';
import { useSignupMutation } from '../redux/features/auth/authApi';
import { toast } from 'sonner';
import { verifyToken } from '../utils/verifyToken';
import { setUser } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';

import { Link, useNavigate } from 'react-router';
import Cta from './shared/Cta';
import ImageUpload from './shared/ImageUpload';
import GoogleLoginBtn from './shared/GoogleLoginBtn';
import FBLoginBtn from './shared/FBLoginBtn';
import signupImg from '../assets/images/signup.jpg';

function Signup() {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Signing up...');

    const formData = new FormData();
    const file = data.userImg[0];

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      country: data.country,
    };

    formData.append('data', JSON.stringify(userData));
    if (file) formData.append('file', file);

    try {
      const res = await signup(formData).unwrap();
      const user = verifyToken(res.data.token);
      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success('Signed up successfully', { id: toastId });
      reset();
      navigate(`/dashboard`);
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong', { id: toastId });
    }
  };

  return (
    <div className="bg-white flex justify-center items-center  min-h-screen ">
      {/* Left Side Image */}
      <div className="w-1/2 hidden lg:block ">
        <img
          src={signupImg}
          alt="Signup background"
          className="block object-cover w-full"
        />
      </div>

      {/* Right Side Form */}
      <div className=" lg:px-20 p-6 md:p-12 sm:p-8  w-full lg:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Create Account
        </h1>

        {/* Social Login Buttons */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="relative">
            <label htmlFor="name" className="block text-gray-600 mb-1">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:border-primary focus:ring-blue-200'
                }`}
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            {errors.name && (
              <p className="bg-red-600 text-white rounded-md  px-2 py-[.8px] text-sm mt-1 inline-flex gap-1 items-center">
                <MdError className="text-lg" />
                {typeof errors.name.message === 'string'
                  ? errors.name.message
                  : 'Invalid name'}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email
            </label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:border-primary focus:ring-blue-200'
                }`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="bg-red-600 text-white rounded-md  px-2 py-[.8px] text-sm mt-1 inline-flex gap-1 items-center">
                <MdError className="text-lg" />
                {typeof errors.email.message === 'string'
                  ? errors.email.message
                  : 'Invalid email'}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:border-primary focus:ring-blue-200'
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="bg-red-600 text-white rounded-md  px-2 py-[.8px] text-sm mt-1 inline-flex gap-1 items-center">
                <MdError className="text-lg" />{' '}
                {typeof errors.password.message === 'string'
                  ? errors.password.message
                  : 'Invalid password'}
              </p>
            )}
          </div>
          {/*  */}
          <div className="relative">
            <label htmlFor="phone" className="block text-gray-600 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <MdLocalPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-primary focus:ring-blue-200"
                {...register('phone')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="country" className="block text-gray-600 mb-1">
                Country
              </label>
              <div className="relative">
                <MdLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="country"
                  type="text"
                  placeholder="Your country"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-primary focus:ring-blue-200"
                  {...register('country')}
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="address" className="block text-gray-600 mb-1">
                Address
              </label>
              <div className="relative">
                <MdHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="address"
                  type="text"
                  placeholder="Street Address"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-primary focus:ring-blue-200"
                  {...register('address')}
                />
              </div>
            </div>
          </div>

          <ImageUpload register={register} name="userImg" errors={errors} />

          {/* Terms and Submit */}
          <div className="flex items-center mt-6">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              {...register('terms', { required: 'You must accept the terms' })}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="bg-red-600 text-white rounded-md  px-2 py-[.8px] text-sm mt-1 inline-flex gap-1 items-center">
              <MdError className="text-lg" />{' '}
              {typeof errors.terms.message === 'string'
                ? errors.terms.message
                : 'Invalid terms'}
            </p>
          )}

          <button type="submit" className="w-full">
            <Cta className="w-full mt-6" text="Sign Up" />
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Log in
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

export default Signup;
