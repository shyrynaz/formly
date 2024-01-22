import Logo from '@/components/Logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen bg-background max-h-screen h-screen'>
      <nav className='flex justify-between items-center border-b border-border h-[70px] px-4 py-2'>
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className='flex flex-col flex-grow w-full'>{children}</main>
    </div>
  );
};

export default Layout;
