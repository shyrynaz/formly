import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex w-full flex-grow mx-auto h-full'>{children}</div>;
};

export default layout;
