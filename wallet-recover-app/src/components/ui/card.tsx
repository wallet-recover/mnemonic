import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div className={`border border-gray-200 bg-white shadow rounded-lg ${className || ''}`}>{children}</div>
);

export const CardContent = ({ children, className }: CardProps) => (
  <div className={`p-4 ${className || ''}`}>{children}</div>
); 