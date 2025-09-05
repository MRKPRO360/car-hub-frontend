import { FaLock, FaUser } from 'react-icons/fa';
import { MdEmail, MdLocalPhone, MdLocationOn, MdHome } from 'react-icons/md';
import { FieldValues, useForm } from 'react-hook-form';
import { useSignupMutation } from '../redux/features/auth/authApi';
import { toast } from 'sonner';
import { verifyToken } from '../utils/verifyToken';
import { setUser } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';

import { Link, useNavigate } from 'react-router';
import Cta from './shared/Cta';
import GoogleLoginBtn from './shared/GoogleLoginBtn';
import FBLoginBtn from './shared/FBLoginBtn';

import loginImg from '../assets/images/login.png';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, CircleAlert } from 'lucide-react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ImageUpload from '../components/ui/imageUpload/ImageUpload';
import { countriesOptions } from '../constant/city';

function Signup() {
  const [signup] = useSignupMutation();
  const totalSteps = 3;
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    trigger,
  } = useForm();

  useGSAP(
    () => {
      gsap.fromTo(
        '.form-step',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }
      );
    },
    {
      dependencies: [step],
    }
  );

  const handleNext = async () => {
    let fieldsToValidate: string[] = [];

    if (step === 1) fieldsToValidate = ['name', 'email', 'password'];
    if (step === 2) fieldsToValidate = ['phone', 'country', 'address'];
    if (step === 3) fieldsToValidate = ['terms'];

    const valid = await trigger(fieldsToValidate);

    if (valid) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

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
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong', { id: toastId });
    }
  };

  return (
    <div className="bg-white flex justify-center items-center  min-h-screen ">
      {/* Left Side Image */}
      <div className="w-1/2 hidden lg:block ">
        <img
          src={loginImg}
          alt="Signup background"
          className="block object-cover w-full"
        />
      </div>

      {/* Right Side Form */}
      <div className=" lg:px-20 p-6 md:p-12 sm:p-8  w-full lg:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Create Account
        </h1>

        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-200/80 h-2 rounded-full mb-6">
          <div
            style={{
              width: `${(step / totalSteps) * 100}%`,
              willChange: 'width',
            }}
            className="bg-primary h-2 rounded-full transition-all duration-500"
          ></div>
        </div>

        <form className="overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div className="form-step space-y-4">
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
                  <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                    {typeof errors.name.message === 'string'
                      ? errors.name.message
                      : 'Invalid name'}

                    <CircleAlert
                      className="text-red-800 dark:text-red-500"
                      size={20}
                    />
                  </p>
                )}
              </div>

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
            </div>
          )}

          {step === 2 && (
            <div className="form-step space-y-4">
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
                    {...register('phone')}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-primary focus:ring-blue-200'
                    }`}
                    {...register('phone', {
                      required: 'Phone is required',
                      minLength: {
                        value: 10,
                        message: 'Phone must be at least 10 numbers',
                      },
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                    {typeof errors.phone.message === 'string'
                      ? errors.phone.message
                      : 'Invalid phone number'}

                    <CircleAlert
                      className="text-red-800 dark:text-red-500"
                      size={20}
                    />
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="country" className="block text-gray-600 mb-1">
                  Country
                </label>

                <div className="relative">
                  <MdLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                  <select
                    id="country"
                    className={`pl-10 pr-3 py-2 dark:text-gray-400 text-gray-600 rounded-md border w-full outline-none focus:outline-none ${
                      errors.country
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-primary'
                    } `}
                    {...register('country', {
                      required: 'Country is required',
                      validate: (value) =>
                        value !== '' || 'Please select your country',
                    })}
                    defaultValue=""
                  >
                    <option
                      className="dark:text-gray-400"
                      value=""
                      hidden
                      disabled
                    >
                      --- Your country --
                    </option>

                    {countriesOptions.map((country, idx) => (
                      <option
                        className="dark:text-gray-800"
                        key={idx}
                        value={country}
                      >
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                {errors?.country && (
                  <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                    {typeof errors?.country.message === 'string'
                      ? errors.country.message
                      : 'Invalid country'}

                    <CircleAlert
                      className="text-red-800 dark:text-red-500"
                      size={20}
                    />
                  </p>
                )}
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
                    {...register('address')}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.address
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-primary focus:ring-blue-200'
                    }`}
                    {...register('address', {
                      required: 'Address is required',
                      minLength: {
                        value: 3,
                        message: 'Please add your address',
                      },
                    })}
                  />
                </div>

                {errors.address && (
                  <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                    {typeof errors.address.message === 'string'
                      ? errors.address.message
                      : 'Invalid address'}

                    <CircleAlert
                      className="text-red-800 dark:text-red-500"
                      size={20}
                    />
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step space-y-4 sm:min-h-[230px] ">
              {/* <ImageUpload register={register} name="userImg" errors={errors} /> */}
              <div className="w-full">
                <ImageUpload
                  label="Profile Picture"
                  multiple={false}
                  onChange={(files) => {
                    if (
                      Array.isArray(files) &&
                      files.length > 0 &&
                      files[0] instanceof File
                    ) {
                      setValue('userImg', files as File[], {
                        shouldValidate: true,
                      });
                      trigger('userImg');
                    }
                  }}
                />

                <input
                  type="hidden"
                  {...register(
                    'userImg'
                    //    {
                    //   validate: (files: File[]) =>
                    //     files?.length > 0 || 'Please select a profile image',
                    // }
                  )}
                />
                {/* {errors.userImg && (
                  <p className="bg-red-600 text-white rounded-md  px-2 py-[.8px] text-sm mt-1 inline-flex gap-1 items-center">
                    <MdError className="text-lg" />
                    {typeof errors.userImg.message === 'string'
                      ? errors.userImg.message
                      : 'Invalid Profile Picture'}
                  </p>
                )} */}
              </div>
              {/* Terms and Submit */}
              <div className="flex items-center mt-6">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  {...register('terms', {
                    required: 'You must accept the terms',
                  })}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-base text-gray-700"
                >
                  I agree to the{' '}
                  <span className="text-primary hover:underline cursor-pointer">
                    Terms and Conditions
                  </span>
                </label>
              </div>
              {errors.terms && (
                <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                  {typeof errors.terms.message === 'string'
                    ? errors.terms.message
                    : 'Invalid terms'}

                  <CircleAlert
                    className="text-red-800 dark:text-red-500"
                    size={20}
                  />
                </p>
              )}{' '}
            </div>
          )}

          {/* NAVIGATION BUTTON */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-md 
    bg-white border border-gray-300 text-gray-700 
    font-medium transition-all duration-200
    hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                type="button"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
                Prev
              </button>
            )}

            {step < totalSteps && (
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-md 
    bg-white border border-gray-300 text-gray-700 
    font-medium transition-all duration-200
    hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                type="button"
                onClick={handleNext}
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {step === totalSteps && (
              <button type="submit" className="">
                <Cta
                  submittingText="Signing Up"
                  isSubmitting={isSubmitting}
                  size="sm"
                  className="w-full"
                  text="Sign Up"
                />
              </button>
            )}
          </div>
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

        {/* SOCIAL BUTTON */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full">
          <GoogleLoginBtn />
          <FBLoginBtn />
        </div>
      </div>
    </div>
  );
}

export default Signup;
