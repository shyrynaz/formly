'use client';
import FormElements from '@/components/builder/FormElements';
import PropertiesSideBar from '@/components/builder/PropertiesSideBar';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const FormDisgner = () => {
  const droppable = useDroppable({
    id: 'desiner-drop-area',
    data: {
      isDesignerDropArea: true
    }
  });
  return (
    <div className='flex w-full h-full'>
      <FormElements />
      <div className='p-4 w-full'>
        <div className='bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto'>
          <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
            Drop form items here
          </p>
        </div>
      </div>
      <PropertiesSideBar />
    </div>
  );
};

export default FormDisgner;
