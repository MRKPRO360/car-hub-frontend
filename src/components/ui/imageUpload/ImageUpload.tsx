import clsx from 'clsx';
import { ImagePlus, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

interface ImageUploadProps {
  label: string;
  multiple?: boolean;
  minFiles?: number;
  onChange: (files: File[]) => void;
}
function ImageUpload({
  label,
  multiple = false,
  minFiles = 1,
  onChange,
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const urls = fileArray.map((file) => URL.createObjectURL(file));

    setPreviews(urls);
    setFiles(fileArray);
    onChange(fileArray);
  };

  const handleRemove = (idx: number) => {
    const newPreviews = previews.filter((_, i) => i !== idx);
    const newFiles = files.filter((_, i) => i !== idx);

    setPreviews(newPreviews);
    setFiles(newFiles);
    onChange(newFiles);

    if (!multiple && inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-base font-semibold text-gray-600 dark:text-gray-400 mb-4">
        {label}
      </label>

      {/* FILE UPLOADING BOX */}
      <div
        onClick={() => inputRef.current?.click()}
        className={clsx(
          'border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer text-center transition hover:bg-gray-100 dark:hover:bg-gray-800',
          previews.length >= minFiles && 'border-green-400'
        )}
      >
        <ImagePlus
          className="mx-auto text-gray-500 dark:text-gray-400"
          size={32}
        />
        <p className="dark:text-gray-400">
          {multiple ? 'Select Images' : 'Select an Image'}
        </p>
      </div>

      {/* HIDDEN INPUT */}
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {/* PREVIEW */}
      {previews.length > 0 && (
        <div className="my-4 grid grid-cols-3 gap-4">
          {previews.map((src, idx) => (
            <div className="relative" key={idx}>
              <img
                src={src}
                alt="preview"
                className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transtion duration-300"
              />
              <button
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-red-600 hover:text-white transition duration-150"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(idx);
                }}
              >
                <Trash2 size={16} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
