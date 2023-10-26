'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; //avoids rehydration errors
  return (
    <Tabs defaultValue={theme}>
      <TabsList className='border'>
        <TabsTrigger value='light' onClick={() => setTheme('light')}>
          <SunIcon className='h-[1.2rem] w-[1.2rem]' />
        </TabsTrigger>
        <TabsTrigger value='dark' onClick={() => setTheme('dark')}>
          <MoonIcon className='h-[1.2rem] w-[1.2rem]' />
        </TabsTrigger>
        <TabsTrigger value='system' onClick={() => setTheme('system')}>
          <DesktopIcon className='h-[1.2rem] w-[1.2rem]' />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
