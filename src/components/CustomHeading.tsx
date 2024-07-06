import { ReactNode } from 'react';

interface CustomHeadingProps {
  children?: ReactNode;
}

function CustomHeading({ children }: CustomHeadingProps) {
  return (
    <>
      <h2 className="text-2xl">{children}</h2>
    </>
  );
}

export default CustomHeading;
