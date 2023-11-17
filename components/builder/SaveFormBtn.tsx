import { Button } from '@/components/ui/button';
import React from 'react';
import { HiSaveAs } from 'react-icons/hi';

const SaveFormBtn = () => {
  return (
    <Button variant={'outline'} className='gap-2 shadow-none'>
      <HiSaveAs className='h-6 w-6' />
      Save Form
    </Button>
  );
};

export default SaveFormBtn;
