interface DefaultLayoutProps {
  children: React.ReactNode;
}

import { ptSerif, openSans } from '@/utils/fonts';

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <main
      className={`flex-grow container mx-auto p-4 ${openSans.variable} ${ptSerif.variable}`}
    >
      {children}
    </main>
  );
}

export default DefaultLayout;
