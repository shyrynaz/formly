import { ShadowIcon } from '@radix-ui/react-icons';
import React from 'react';

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-full w-full'>
      <ShadowIcon className='animate-spin h-12 w-12' />
    </div>
  );
};

export default Loading;
