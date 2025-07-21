import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'default';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'default', className, ...props }, ref) => {
  const base = 'px-4 py-2 rounded-md font-bold transition-colors cursor-pointer';
  const outline = 'border border-gray-200 shadow-sm bg-white text-gray-800 hover:bg-gray-100';
  const def = 'bg-black text-white hover:bg-gray-800';
  return (
    <button
      ref={ref}
      className={`${base} ${variant === 'outline' ? outline : def} ${className || ''}`}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button }; 