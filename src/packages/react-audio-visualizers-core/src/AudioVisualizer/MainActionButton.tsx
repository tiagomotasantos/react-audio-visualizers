import { ButtonHTMLAttributes } from 'react';

export const MainActionButton = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="main-action-button" {...props}>
    {children}
  </button>
);
