import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-tailwindcss-select';

interface ICarSelect {
  name: string;
  label: string;
  error: any;
  required: boolean;
  options: any;
}

const CarSelect = ({ name, label, required, options }: ICarSelect) => {
  const [animal, setAnimal] = useState(null);

  const handleChange = (value) => {
    console.log('value:', value);
    setAnimal(value);
  };

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            {...field}
            primaryColor="blue"
            value={animal}
            onChange={handleChange}
            options={options}
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </>
      )}
    />
  );
};

export default CarSelect;
