import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';

import Label from '../ui/form/Label';
import Input from '../ui/form/input/InputField';
import { IUser } from '../../types';
import { Button } from '../ui/button/Button';
import { useForm } from 'react-hook-form';
import Cta from '../../pages/shared/Cta';
import { useEffect } from 'react';
import ImageUpload from '../ui/imageUpload/ImageUpload';

export default function UserMetaCard({ user }: { user: IUser }) {
  console.log(user);
  const { isOpen, openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    setValue,
  } = useForm<IUser>();

  const onSubmit = async (data) => {
    console.log(data);
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
              <img src={user.profileImg} alt="user" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user.name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.role.toUpperCase()}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.address}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

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
                      className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
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
                    <Label>Full Name</Label>
                    <Input {...register('name')} type="text" value="Musharof" />
                  </div>

                  {/* IN LARGE VIEW IT"LL TAKE 2 COLUMNS BUT IN THE MOBILE VIEW IT"LL TAKE ONE COLUMN*/}
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input type="text" value="randomuser@pimjo.com" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input type="text" value="+09 363 398 46" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Address</Label>
                    <Input type="text" value="Team Manager" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Country</Label>
                    <Input type="text" value="Team Manager" />
                  </div>
                  <div className="col-span-2">
                    <ImageUpload
                      label="Profile Picture"
                      multiple={false}
                      onChange={(files) => {
                        setValue('profileImg', files, { shouldValidate: true });
                        trigger('profileImg');
                      }}
                      initialImages={user?.profileImg ? [user?.profileImg] : []}
                    />

                    <input
                      type="hidden"
                      {...register('coverImage', {
                        required: 'A car should have a cover image!',
                        validate: (files: File[]) =>
                          files?.length > 0 || 'Please select a cover image',
                      })}
                    />
                    {errors.coverImage && (
                      <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                        {errors.coverImage.message}

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
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Cta text="Save Changes" size="sm" />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
