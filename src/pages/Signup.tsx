import {
  FaFacebook,
  FaGoogle,
  FaImage,
  FaLock,
  FaTwitter,
  FaUser,
} from 'react-icons/fa';
import loginBg from '../assets/login.jpg';
import Button from './shared/Button';
import { MdEmail, MdHome, MdLocalPhone, MdLocationOn } from 'react-icons/md';
import Checkbox from '../components/form/CheckBox';
import { Link, useNavigate } from 'react-router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSignupMutation } from '../redux/features/auth/authApi';
import { IResponse } from '../types';
import { toast } from 'sonner';

function Signup() {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Signup ...');

    const formData = new FormData();
    const file = data.userImg[0];
    console.log(data);

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      city: data.city,
    };

    formData.append('data', JSON.stringify(userData));

    if (file) {
      formData.append('file', file);
    }

    try {
      const res = (await signup(formData)) as IResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('Signed up successfully', { id: toastId });
        reset();
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(13, 27, 42, 0.65), rgba(13, 27, 42, 0.8)), url(${loginBg})`,
      }}
      className="w-full pt-25 min-h-full bg-cover bg-center bg-no-repeat pb-10"
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
            <h3 className="text-center text-3xl font-semibold mt-5">Signup</h3>
            <div
              style={{
                width: 'calc(100% - 200px)',
              }}
              className="flex itmes-center py-7 justify-between mx-auto text-xl sm:text-2xl"
            >
              <FaGoogle />
              <FaFacebook />
              <FaTwitter />
            </div>
          </div>
        </div>
        <div className="pt-14">
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full md:w-[80%] mx-auto relative">
              <label
                htmlFor="name"
                className=" absolute top-3.5 left-0 text-[1.5rem]"
              >
                <FaUser />
              </label>
              <input
                type="text"
                className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
                  errors?.name ? 'border-red-500' : 'focus:border-blue'
                }`}
                placeholder="Your name"
                {...register('name', { required: true })}
              />

              {errors.name && (
                <span className="text-red-500">Name is required!</span>
              )}
            </div>

            <div className="w-full md:w-[80%] mx-auto relative">
              <label
                htmlFor="email"
                className=" absolute top-3.5 left-0 text-[1.5rem]"
              >
                <MdEmail />
              </label>
              <input
                type="email"
                placeholder="Your email"
                className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
                  errors?.email ? 'border-red-500' : 'focus:border-blue'
                }`}
                {...register('email', { required: true })}
              />

              {errors.email && (
                <span className="text-red-500">Email is required!</span>
              )}
            </div>
            <div className="w-full md:w-[80%] mx-auto relative">
              <label
                htmlFor="password"
                className=" absolute top-3.5 left-0 text-[1.5rem]"
              >
                <FaLock />
              </label>
              <input
                type="password"
                placeholder="Your password"
                className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
                  errors?.password ? 'border-red-500' : 'focus:border-blue'
                }`}
                {...register('password', { required: true })}
              />

              {errors.password && (
                <span className="text-red-500">Password name is required!</span>
              )}
            </div>

            <div className="w-full md:w-[80%] mx-auto relative">
              <label
                htmlFor="phone"
                className=" absolute top-3.5 left-0 text-[1.5rem]"
              >
                <MdLocalPhone />
              </label>
              <input
                type="phone"
                placeholder="Your Phone"
                className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
                  errors?.phone ? 'border-red-500' : 'focus:border-blue'
                }`}
                {...register('phone')}
              />
            </div>

            <div className="w-full md:w-[80%] mx-auto relative">
              <label
                htmlFor="city"
                className=" absolute top-3.5 left-0 text-[1.5rem]"
              >
                <MdLocationOn />
              </label>
              <input
                type="city"
                placeholder="Your City"
                className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
                  errors?.city ? 'border-red-500' : 'focus:border-blue'
                }`}
                {...register('city')}
              />
            </div>

            <div className="w-full md:w-[80%] mx-auto relative">
              <label
                htmlFor="address"
                className=" absolute top-3.5 left-0 text-[1.5rem]"
              >
                <MdHome />
              </label>
              <input
                type="address"
                placeholder="Your address"
                className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
                  errors?.address ? 'border-red-500' : 'focus:border-blue'
                }`}
                {...register('address')}
              />
            </div>

            <div className="w-full md:w-[80%] mx-auto relative">
              <label
                htmlFor="user-img"
                className=" absolute top-3.5 left-0 text-[1.5rem]"
              >
                <FaImage />
              </label>

              <input
                className="peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md cursor-pointer"
                type="file"
                id="user-img"
                {...register('userImg')}
              />
            </div>

            <div className=" md:mt-4">
              <Checkbox text="Remember Me" />
              <div className="flex items-center gap-4 w-full md:w-[80%] mx-auto mt-5">
                <Button type="submit" size="lg" text="Signup" />
                <Button variant="outlined" text="Forget Password?" />
              </div>
            </div>

            <p className="text-blue/80 w-full md:w-[80%] relative mx-auto pb-5 mt-5">
              Have an account already?{' '}
              <Link to={'/login'} className="text-blue font-semibold ">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
