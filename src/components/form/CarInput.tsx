import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface ICarInputProps {
  icon?: ReactNode;
  type: 'text' | 'password' | 'email' | 'file';
  name: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<any>;
  error?: { message: string };
  required?: boolean;
}

const CarInput = ({
  icon,
  type,
  name,
  label,
  disabled,
  register,
  error,
  required,
}: ICarInputProps) => {
  return (
    <div className="mb-4 flex items-center flex-col gap-5 justify-center">
      <div className="w-full md:w-[80%] relative">
        <label
          htmlFor={name}
          className=" absolute top-3.5 left-0 text-[1.5rem]"
        >
          {icon}
        </label>

        <>
          <input
            {...register(
              name,
              required ? { required: `${label} is required` } : {}
            )}
            type={type}
            name={name}
            id={name}
            placeholder={label}
            disabled={disabled}
            className={`peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md ${
              error?.message ? 'border-red-500' : 'focus:border-primary'
            }`}
          />
          {error?.message && (
            <p className="text-red-500 text-sm mt-1">{error?.message}</p>
          )}
        </>
      </div>
    </div>
  );
};

export default CarInput;
