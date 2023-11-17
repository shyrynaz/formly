import { Button } from '@/components/ui/button';
import React from 'react';
import { MdOutlinePublish } from 'react-icons/md';

const PublishFormButton = () => {
  return (
    <Button className='gap-2 shadow-none bg-gradient-to-r from-indigo-400 to-cyan-300'>
      <MdOutlinePublish className='h-6 w-6' />
      Publish Form
    </Button>
  );
};

export default PublishFormButton;
