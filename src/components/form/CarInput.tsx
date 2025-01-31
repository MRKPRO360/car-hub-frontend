import { ReactNode, useState } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface ICarInputProps {
  icon?: ReactNode;
  type: 'text' | 'password' | 'email' | 'file';
  name: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<any>;
  error?: { message: string };
  required?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
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
  setValue,
}: ICarInputProps) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTextName = e.target.files?.[0].name;
    if (fileTextName) {
      setFileName(fileTextName);
      setValue(name, fileTextName);
    } else {
      setFileName('No file chosen!');
      setValue(name, null);
    }
  };

  return (
    <div className="mb-4 flex items-center flex-col gap-5 justify-center">
      <div className="w-full md:w-[80%] relative">
        <label
          htmlFor={name}
          className=" absolute top-3.5 left-0 text-[1.5rem]"
        >
          {icon}
        </label>

        {type === 'file' ? (
          <div className="flex items-center">
            <input
              type={type}
              id={name}
              {...register(
                name,
                required ? { required: `${label} is required` } : {}
              )}
              onChange={(e) => handleFile(e)}
              className="hidden"
            />
            <label
              htmlFor={name}
              className="cursor-pointer peer border-b-2 outline-none pl-8 pr-2 py-3 w-full focus:border-primary transition-colors duration-300 text-base sm:text-md"
            >
              {fileName || label} {/* ✅ Show selected file name or label */}
            </label>
            {error?.message && (
              <p className="text-red-500 text-sm mt-1">{error?.message}</p>
            )}
          </div>
        ) : (
          <>
            {' '}
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
        )}
      </div>
    </div>
  );
};

export default CarInput;
