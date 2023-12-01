import { Button } from '@/components/ui/button';
import React from 'react';
import { MdPreview } from 'react-icons/md';

const PreviewButton = () => {
  return (
    <Button variant={'outline'} className='gap-2 shadow-none'>
      <MdPreview className='h-6 w-6' />
      Preview Form
    </Button>
  );
};

export default PreviewButton;
