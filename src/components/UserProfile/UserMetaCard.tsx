import { useModal } from '../../hooks/useModal';

import { IUser } from '../../types';
import { FieldValues, useForm } from 'react-hook-form';
import Cta from '../../pages/shared/Cta';
import { useEffect } from 'react';
import ImageUpload from '../ui/imageUpload/ImageUpload';
import { CircleAlert } from 'lucide-react';
import { countriesOptions } from '../../constant/city';
import { toast } from 'sonner';

import { useUpdateMeMutation } from '../../redux/features/user/selfManagement';
import { ContentModal } from '../ui/modal';
import { RxPencil1 } from 'react-icons/rx';
import { FaUser } from 'react-icons/fa6';
import { MdEmail, MdHome, MdLocalPhone, MdLocationOn } from 'react-icons/md';

export default function UserMetaCard({ user }: { user: IUser | null }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [update] = useUpdateMeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    setValue,
  } = useForm<IUser>();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Updating...');
    const formData = new FormData();

    const { profileImg, ...userData } = data;
    formData.append('data', JSON.stringify(userData));
    const file = data.profileImg?.[0];

    if (file && file instanceof File) {
      formData.append('file', file);
    }

    try {
      await update({ id: user?._id, data: formData }).unwrap();

      toast.success('Profile updated successfully', {
        id: toastId,
      });

      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      reset(user);
    }
  }, [user, reset]);

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img
                className="object-cover w-full h-full"
                src={user?.profileImg as string}
                alt="user"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user?.name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.role?.toUpperCase()}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.address}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <RxPencil1 className="text-xl text-current" strokeWidth={0.8} />
            Edit
          </button>
        </div>
      </div>
      <ContentModal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px]"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-lg bg-white p-4 2xsm:p-7 dark:bg-gray-900 lg:p-11">
          <div className="px-2">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-base text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <span className="h-px w-full bg-gray-200 dark:bg-gray-600"></span>
                  <h5 className="text-lg text-center  font-medium text-gray-800 dark:text-white/80 w-full ">
                    Personal Information
                  </h5>

                  <span className="h-px w-full bg-gray-200 dark:bg-gray-600"></span>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  {/* <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-600 dark:text-white/80 font-semibold text-base"
                    >
                      NAME <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Mileage exmp. 14.5"
                      className={`pl-10 py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                        errors.name
                          ? 'border-red-800'
                          : 'border-gray-300 focus:border-primary'
                      }`}
                      {...register('name', {
                        required: 'name is required',
                      })}
                    />
                    {errors.name && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.name.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )} 
                  </div> */}

                  <div className="col-span-2">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="block text-gray-600 dark:text-white/80 font-semibold text-base mb-1"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className={`pl-10 py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                            errors.name
                              ? 'border-red-800'
                              : 'border-gray-300 focus:border-primary'
                          }`}
                          {...register('name', {
                            required: 'Name is required',
                          })}
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
                  </div>

                  {/* IN LARGE VIEW IT"LL TAKE 2 COLUMNS BUT IN THE MOBILE VIEW IT"LL TAKE ONE COLUMN*/}
                  <div className="col-span-2 lg:col-span-1">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block text-gray-600 dark:text-white/80 font-semibold text-base mb-1"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="email"
                          type="email"
                          placeholder="example@email.com"
                          className={`pl-10 py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                            errors.email
                              ? 'border-red-800'
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
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <div className="relative">
                      <label
                        htmlFor="phone"
                        className="block text-gray-600 dark:text-white/80 font-semibold text-base mb-1"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <MdLocalPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+1234567890"
                          {...register('phone')}
                          className={`pl-10 py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                            errors.phone
                              ? 'border-red-800'
                              : 'border-gray-300 focus:border-primary'
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
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <div className="relative">
                      <label
                        htmlFor="country"
                        className="block text-gray-600 dark:text-white/80 font-semibold text-base mb-1"
                      >
                        Country
                      </label>

                      <div className="relative">
                        <MdLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                        <select
                          id="country"
                          className={`pl-10 py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                            errors.country
                              ? 'border-red-800'
                              : 'border-gray-300 focus:border-primary'
                          }`}
                          {...register('country', {
                            required: 'Country is required',
                            validate: (value) =>
                              value !== '' || 'Please select your country',
                          })}
                          defaultValue=""
                        >
                          <option
                            className="dark:text-white/80"
                            value=""
                            hidden
                            disabled
                          >
                            --- Your country --
                          </option>

                          {countriesOptions.map((country, idx) => (
                            <option
                              className="dark:text-gray-800 dark:bg-gray-300"
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
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <div className="relative">
                      <label
                        htmlFor="address"
                        className="block text-gray-600 dark:text-white/80 font-semibold text-base mb-1"
                      >
                        Address
                      </label>
                      <div className="relative">
                        <MdHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="address"
                          type="text"
                          placeholder="Street Address"
                          {...register('address')}
                          className={`pl-10 py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                            errors.address
                              ? 'border-red-500'
                              : 'border-gray-300 focus:border-primary'
                          }
              `}
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
                  <div className="col-span-2">
                    <ImageUpload
                      label="Profile Picture"
                      multiple={false}
                      onChange={(files) => {
                        if (
                          Array.isArray(files) &&
                          files.length > 0 &&
                          files[0] instanceof File
                        ) {
                          setValue('profileImg', files as File[], {
                            shouldValidate: true,
                          });
                          trigger('profileImg');
                        }
                      }}
                      initialImages={
                        user?.profileImg ? [user?.profileImg as string] : []
                      }
                    />

                    <input
                      type="hidden"
                      {...register('profileImg', {
                        required: 'A person should have a profile image!',
                        validate: (files: File[] | string) =>
                          files?.length > 0 || 'Please select a profile image',
                      })}
                    />
                    {errors.profileImg && (
                      <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                        {errors.profileImg.message}

                        <CircleAlert
                          className="text-red-800 dark:text-red-500"
                          size={20}
                        />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button type="button" onClick={() => closeModal()}>
                <Cta
                  size="sm"
                  text="Cancel"
                  className="bg-red-600 hover:bg-red-700"
                />
              </button>
              <button type="submit">
                <Cta
                  isSubmitting={isSubmitting}
                  submittingText="Updating"
                  text="Save Changes"
                  size="sm"
                />
              </button>
            </div>
          </form>
        </div>
      </ContentModal>
    </>
  );
}
