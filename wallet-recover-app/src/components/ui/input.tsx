import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return <input ref={ref} {...props} className={`border border-gray-200 shadow-sm rounded px-3 py-2 ${props.className || ''}`} />;
});

Input.displayName = 'Input';

export { Input }; 