import FormElementButton from '@/components/builder/FormElementButton';
import { FormElements } from '@/components/builder/FormElementInterface';
import React from 'react';

const FormElementsSideBar = () => {
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      <FormElementButton formElement={FormElements.TextField} />
    </aside>
  );
};

export default FormElementsSideBar;
