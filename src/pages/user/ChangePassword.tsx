import { Link, useNavigate } from 'react-router';
import { useAppDispatch } from '../../redux/hooks';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { verifyToken } from '../../utils/verifyToken';
import { logout, setUser } from '../../redux/features/auth/authSlice';
import loginBg from '../../assets/login.jpg';
import { FaLock } from 'react-icons/fa';
import CarForm from '../../components/form/CarForm';
import CarInput from '../../components/form/CarInput';

import Button from '../shared/Button';
import { IResponse } from '../../types';
import { useChangeMyPasswordMutation } from '../../redux/features/user/selfManagement';

function ChangePassword() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [changePassword] = useChangeMyPasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Changing password...');

    try {
      // const res = (await changePassword(data)) as TResponse<any>;

      console.log(data);

      const res = await changePassword(data);
      console.log(res);
      if (res?.data?.success) {
        toast.success('Password changed successfully!', {
          id: toastId,
          duration: 2000,
        });
        dispatch(logout());
        navigate('/login');
      }

      if (res?.error) {
        const message = (res?.error as IResponse<any>)?.data.message;
        toast.error(message, { id: toastId });
      }
    } catch (err) {
      console.log(err);

      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
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
          <div className="py-5">
            <h3 className="text-center text-3xl font-semibold mt-5">
              Change Your Password
            </h3>
          </div>
        </div>
        <div className="pt-20">
          <CarForm onSubmit={onSubmit}>
            {(methods) => (
              <>
                <CarInput
                  type="password"
                  name="oldPassword"
                  label="Your Current Password"
                  icon={<FaLock />}
                  register={methods.register}
                  error={methods.formState.errors.password}
                  required={true}
                />
                <CarInput
                  type="password"
                  name="newPassword"
                  label="New Password"
                  icon={<FaLock />}
                  register={methods.register}
                  error={methods.formState.errors.password}
                  required={true}
                />

                <div className="flex items-center gap-4 w-full md:w-[80%] mx-auto mt-8">
                  <Button type="submit" size="lg" text="Submit" />
                </div>

                <div className="text-blue/80 w-full md:w-[80%] relative mx-auto pb-5 mt-7 flex flex-col">
                  <span>Don't want to change your password?</span>
                  <span>
                    Go back to &nbsp;
                    <Link to="/" className="text-blue font-semibold ">
                      Home
                    </Link>
                  </span>
                </div>
              </>
            )}
          </CarForm>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
