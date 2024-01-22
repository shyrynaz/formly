import FormElementButton from '@/components/builder/FormElementButton';
import { FormElements } from '@/components/builder/FormElementInterface';
import React from 'react';
import { Separator } from '@/components/ui/separator';

const FormElementsSideBar = () => {
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted bg-background overflow-y-auto h-full'>
      <div className='p-4 flex justify-between items-center font-bold'>
        <p className='text-sm text-foreground/70'>Form elements</p>
      </div>
      <Separator className='mb-4' />
      <p className='px-4 font-bold'>Layout Elements</p>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4 place-items-center p-4'>
        <FormElementButton formElement={FormElements.TextField} />
        <FormElementButton formElement={FormElements.TitleField} />
      </div>
    </aside>
  );
};

export default FormElementsSideBar;
