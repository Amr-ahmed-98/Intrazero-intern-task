import React from 'react';
import Navbar from './_Components/Navbar/Navbar';
import Providers from './_Components/Providers/Providers';
import { i18n } from '../../next-i18next.config'; 

import '../app/globals.css';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, params }) => {
  return (
    <html lang={params.lang}>
      <body className='bg-[#FEF3E2]'>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;