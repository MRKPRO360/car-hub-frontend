// import {
//   FaFacebook,
//   FaGoogle,
//   FaImage,
//   FaLock,
//   FaTwitter,
//   FaUser,
// } from 'react-icons/fa';
// import loginBg from '../assets/login.jpg';
// import Button from './shared/Button';
// import { MdEmail, MdHome, MdLocalPhone, MdLocationOn } from 'react-icons/md';
// import Checkbox from '../components/form/CheckBox';
// import { Link, useNavigate } from 'react-router';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { useSignupMutation } from '../redux/features/auth/authApi';
// import { IResponse, IUser } from '../types';
// import { toast } from 'sonner';
// import { verifyToken } from '../utils/verifyToken';
// import { setUser } from '../redux/features/auth/authSlice';
// import { useAppDispatch } from '../redux/hooks';

// function Signup() {
//   const [signup] = useSignupMutation();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const toastId = toast.loading('Signup ...');

//     const formData = new FormData();
//     const file = data.userImg[0];
//     console.log(data);

//     const userData = {
//       name: data.name,
//       email: data.email,
//       password: data.password,
//       phone: data.phone,
//       address: data.address,
//       city: data.city,
//     };

//     formData.append('data', JSON.stringify(userData));

//     if (file) {
//       formData.append('file', file);
//     }

//     try {
//       const res = (await signup(formData).unwrap()) as IResponse<any>;

//       if (res.error) {
//         toast.error(res?.error?.data?.message, { id: toastId });
//       } else {
//         const user = verifyToken(res.data.token) as IUser;
//         // SETTING USER TO REDUX STORE
//         dispatch(setUser({ user: user, token: res.data.token }));
//         toast.success('Signed up successfully', { id: toastId });
//         reset();
//         navigate(`/${user.role}/dashboard`);
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error('Something went wrong', { id: toastId });
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `linear-gradient(to right, rgba(13, 27, 42, 0.65), rgba(13, 27, 42, 0.8)), url(${loginBg})`,
//       }}
//       className="w-full pt-25 min-h-full bg-cover bg-center bg-no-repeat pb-10"
//     >
//       <div className="bg-light mx-auto max-w-96 relative sm:max-w-[450px] rounded-sm shadow-2xl shadow-blue px-5 md:px-0">
//         <div
//           style={{
//             backgroundImage: `linear-gradient(to right, rgba(13, 27, 42, .95), rgba(13, 27, 42, 1))`,
//             width: 'calc(100% - 40px)',
//             position: 'absolute',
//             top: '-2%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//           }}
//           className="text-light z-30 rounded-md"
//         >
//           <div>
//             <h3 className="text-center text-3xl font-semibold mt-5">Signup</h3>
//             <div
//               style={{
//                 width: 'calc(100% - 200px)',
//               }}
//               className="flex itmes-center py-7 justify-between mx-auto text-xl sm:text-2xl"
//             >
//               <FaGoogle />
//               <FaFacebook />
//               <FaTwitter />
//             </div>
//           </div>
//         </div>
//         <div className="pt-14">
//           <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
//             <div className="w-full md:w-[80%] mx-auto relative">
//               <label
//                 htmlFor="name"
//                 className=" absolute top-3.5 left-0 text-[1.5rem]"
//               >
//                 <FaUser />
//               </label>
//               <input
//                 type="text"
//                 className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
//                   errors?.name ? 'border-red-500' : 'focus:border-blue'
//                 }`}
//                 placeholder="Your name"
//                 {...register('name', { required: true })}
//               />

//               {errors.name && (
//                 <span className="text-red-500">Name is required!</span>
//               )}
//             </div>

//             <div className="w-full md:w-[80%] mx-auto relative">
//               <label
//                 htmlFor="email"
//                 className=" absolute top-3.5 left-0 text-[1.5rem]"
//               >
//                 <MdEmail />
//               </label>
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
//                   errors?.email ? 'border-red-500' : 'focus:border-blue'
//                 }`}
//                 {...register('email', { required: true })}
//               />

//               {errors.email && (
//                 <span className="text-red-500">Email is required!</span>
//               )}
//             </div>
//             <div className="w-full md:w-[80%] mx-auto relative">
//               <label
//                 htmlFor="password"
//                 className=" absolute top-3.5 left-0 text-[1.5rem]"
//               >
//                 <FaLock />
//               </label>
//               <input
//                 type="password"
//                 placeholder="Your password"
//                 className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
//                   errors?.password ? 'border-red-500' : 'focus:border-blue'
//                 }`}
//                 {...register('password', { required: true })}
//               />

//               {errors.password && (
//                 <span className="text-red-500">Password name is required!</span>
//               )}
//             </div>

//             <div className="w-full md:w-[80%] mx-auto relative">
//               <label
//                 htmlFor="phone"
//                 className=" absolute top-3.5 left-0 text-[1.5rem]"
//               >
//                 <MdLocalPhone />
//               </label>
//               <input
//                 type="phone"
//                 placeholder="Your Phone"
//                 className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
//                   errors?.phone ? 'border-red-500' : 'focus:border-blue'
//                 }`}
//                 {...register('phone')}
//               />
//             </div>

//             <div className="w-full md:w-[80%] mx-auto relative">
//               <label
//                 htmlFor="city"
//                 className=" absolute top-3.5 left-0 text-[1.5rem]"
//               >
//                 <MdLocationOn />
//               </label>
//               <input
//                 type="city"
//                 placeholder="Your City"
//                 className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
//                   errors?.city ? 'border-red-500' : 'focus:border-blue'
//                 }`}
//                 {...register('city')}
//               />
//             </div>

//             <div className="w-full md:w-[80%] mx-auto relative">
//               <label
//                 htmlFor="address"
//                 className=" absolute top-3.5 left-0 text-[1.5rem]"
//               >
//                 <MdHome />
//               </label>
//               <input
//                 type="address"
//                 placeholder="Your address"
//                 className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
//                   errors?.address ? 'border-red-500' : 'focus:border-blue'
//                 }`}
//                 {...register('address')}
//               />
//             </div>

//             <div className="w-full md:w-[80%] mx-auto relative">
//               <label
//                 htmlFor="user-img"
//                 className=" absolute top-3.5 left-0 text-[1.5rem]"
//               >
//                 <FaImage />
//               </label>

//               <input
//                 className="peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md cursor-pointer"
//                 type="file"
//                 id="user-img"
//                 {...register('userImg')}
//               />
//             </div>

//             <div className=" md:mt-4">
//               <Checkbox text="Remember Me" />
//               <div className="flex items-center gap-4 w-full md:w-[80%] mx-auto mt-5">
//                 <Button type="submit" size="lg" text="Signup" />
//                 <Button variant="outlined" text="Forget Password?" />
//               </div>
//             </div>

//             <p className="text-blue/80 w-full md:w-[80%] relative mx-auto pb-5 mt-5">
//               Have an account already?{' '}
//               <Link to={'/login'} className="text-blue font-semibold ">
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import { FaFacebook, FaLock, FaUser } from 'react-icons/fa';
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
import { FcGoogle } from 'react-icons/fc';
import GoogleLoginBtn from './shared/GoogleLoginBtn';
import FBLoginBtn from './shared/FBLoginBtn';

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
    <div className="bg-white flex justify-center  min-h-screen ">
      {/* Left Side Image */}
      <div className="w-1/2 min-h-screen hidden lg:block ">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Signup background"
          className="object-cover w-full h-full"
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

          {/* Phone Field */}
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

          {/* Address Fields */}
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

          {/* Profile Picture Upload */}

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
          {/* <button
            className="w-full flex items-center justify-center mb-6 md:mb-0 border border-primary text-sm text-gray-500 py-2 px-5 gap-1 rounded-md tracking-wide font-medium cursor-pointer transition ease-in duration-500"
            type="button"
          >
            <FcGoogle className="text-2xl" />
            <span>Google</span>
          </button>

          <button
            className="w-full flex items-center justify-center mb-6 md:mb-0 border border-primary text-sm text-gray-500 py-2 px-5 gap-1 rounded-md tracking-wide font-medium cursor-pointer transition ease-in duration-500"
            type="button"
          >
            <FaFacebook className="text-2xl text-blue-600" />
            <span>Facebook</span>
          </button> */}

          <GoogleLoginBtn />
          <FBLoginBtn />
        </div>
      </div>
    </div>
  );
}

export default Signup;
