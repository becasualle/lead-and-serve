import { ReactNode } from 'react';

interface CustomHeadingProps {
  children?: ReactNode;
}

function CustomHeading({ children }: CustomHeadingProps) {
  return (
    <>
      <h2>{children}</h2>
    </>
  );
}

export default CustomHeading;
