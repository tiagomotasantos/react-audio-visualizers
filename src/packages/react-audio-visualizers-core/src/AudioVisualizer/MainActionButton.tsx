import { ButtonHTMLAttributes } from 'react';

interface MainActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export const MainActionButton = ({ children, onClick, ...props }: MainActionButtonProps) => (
  <button className="main-action-button" onClick={onClick} {...props}>
    {children}
  </button>
);
