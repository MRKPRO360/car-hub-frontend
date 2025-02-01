import {
  FaFacebook,
  FaGoogle,
  FaLock,
  FaTwitter,
  FaUser,
} from 'react-icons/fa';
import loginBg from '../assets/login.jpg';
import CarInput from '../components/form/CarInput';
import Button from './shared/Button';
import CarForm from '../components/form/CarForm';
import { MdEmail, MdHome, MdLocalPhone, MdLocationOn } from 'react-icons/md';
import Checkbox from '../components/form/CheckBox';
import { Link } from 'react-router';
import { IoMdCloudUpload } from 'react-icons/io';
import { FieldValues, SubmitHandler } from 'react-hook-form';

function Signup() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const file = data.file;
    console.log({ data, file });

    const userData = {
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      city: data.city,
    };

    formData.append('data', JSON.stringify(userData));

    // if (file) {
    //   formData.append('file', file);
    // }

    // console.log('Form submitted', formData);
    // console.log(file);
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
          <CarForm onSubmit={onSubmit}>
            {(methods) => (
              <>
                <CarInput
                  type="text"
                  name="name"
                  label="Name"
                  icon={<FaUser />}
                  register={methods.register}
                  error={methods.formState.errors.name}
                  required={true}
                />

                <CarInput
                  type="email"
                  name="email"
                  label="Email"
                  icon={<MdEmail />}
                  register={methods.register}
                  error={methods.formState.errors.email}
                  required={true}
                />
                <CarInput
                  type="password"
                  name="password"
                  label="Password"
                  icon={<FaLock />}
                  register={methods.register}
                  error={methods.formState.errors.password}
                  required={true}
                />
                {/* <CarInput
                  type="file"
                  name="file"
                  label="Upload Profile Photo"
                  icon={<IoMdCloudUpload />}
                  register={methods.register}
                  error={methods.formState.errors.file}
                  required={true}
                  setValue={methods.setValue}
                /> */}
                <CarInput
                  type="text"
                  name="phone"
                  label="Phone"
                  icon={<MdLocalPhone />}
                  register={methods.register}
                  error={methods.formState.errors.phone}
                />
                <CarInput
                  type="text"
                  name="address"
                  label="Address"
                  icon={<MdLocationOn />}
                  register={methods.register}
                  error={methods.formState.errors.address}
                />
                <CarInput
                  type="text"
                  name="city"
                  label="City"
                  icon={<MdHome />}
                  register={methods.register}
                  error={methods.formState.errors.city}
                />

                <div>
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
              </>
            )}
          </CarForm>
        </div>
      </div>
    </div>
  );
}

export default Signup;
