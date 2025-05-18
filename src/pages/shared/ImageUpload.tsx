import { useState, useRef, ChangeEvent } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { MdError } from 'react-icons/md';

interface ImageUploadProps {
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors; // Updated type to match react-hook-form's errors
}

function ImageUpload({ register, name, errors }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">Profile Picture</label>

      {/* Image Preview */}
      {preview && (
        <div className="relative mb-4 w-32 h-32">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-full border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      )}

      {/* File Input */}
      <div className="relative">
        <label
          htmlFor="image-upload"
          className={`flex items-center justify-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer ${
            errors?.[name]
              ? 'border-red-500'
              : 'border-gray-300 hover:border-primary'
          }`}
        >
          <FaImage className="mr-2 text-gray-400" />
          <span className="text-gray-600">
            {preview ? 'Change Image' : 'Upload Image'}
          </span>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          {...register(name, {
            validate: (value) => {
              if (!value?.[0]) return 'Profile picture is required';
              return true;
            },
          })}
          ref={(e) => {
            register(name).ref(e);
            if (e)
              (
                fileInputRef as React.MutableRefObject<HTMLInputElement | null>
              ).current = e;
          }}
          onChange={(e) => {
            register(name).onChange(e);
            handleImageChange(e);
          }}
        />
      </div>

      {errors?.[name] && (
        <p className="bg-red-600 text-white rounded-md  px-2 py-[.8px] text-sm mt-1 inline-flex gap-1 items-center">
          <MdError className="text-lg" />{' '}
          {typeof errors[name]?.message === 'string'
            ? errors[name]?.message
            : 'Invalid image'}
        </p>
      )}
    </div>
  );
}

export default ImageUpload;
