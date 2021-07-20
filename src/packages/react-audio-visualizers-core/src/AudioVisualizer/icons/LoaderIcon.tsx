import { CSSProperties } from 'react';

interface LoaderIconProps {
  color: string;
}

export const LoaderIcon = ({ color }: LoaderIconProps) => {
  const style: CSSProperties = { backgroundColor: color };

  return (
    <>
      <div style={style} className="loader-bar loader-bar-1"></div>
      <div style={style} className="loader-bar loader-bar-2"></div>
      <div style={style} className="loader-bar loader-bar-3"></div>
    </>
  );
};
