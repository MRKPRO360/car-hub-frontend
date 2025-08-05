import { forwardRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ htmlFor, children, className }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={clsx(
          twMerge(
            'mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400',
            className
          )
        )}
      >
        {children}
      </label>
    );
  }
);

export default Label;
