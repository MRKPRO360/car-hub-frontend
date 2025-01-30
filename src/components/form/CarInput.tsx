import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface ICarInputProps {
  icon?: ReactNode;
  type: 'text' | 'password' | 'email';
  name: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<any>;
}

const CarInput = ({
  icon,
  type,
  name,
  label,
  disabled,
  register,
}: ICarInputProps) => {
  return (
    <div className="mb-4 flex items-center flex-col gap-5 justify-center">
      {/* username input with icon */}
      <div className="w-full md:w-[80%] relative">
        <label
          htmlFor={name}
          className=" absolute top-3.5 left-0 text-[1.5rem]"
        >
          {icon}
        </label>
        <input
          {...register(name)}
          type={type}
          name={name}
          id={name}
          placeholder={label}
          disabled={disabled}
          className="peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md"
        />
      </div>
    </div>
  );
};

export default CarInput;
