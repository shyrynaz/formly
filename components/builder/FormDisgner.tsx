'use client';
import PropertiesSideBar from '@/components/builder/PropertiesSideBar';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import FormElementsSideBar from '@/components/builder/FormElements';
import { cn } from '@/lib/utils';

const FormDisgner = () => {
  const droppable = useDroppable({
    id: 'desiner-drop-area',
    data: {
      isDesignerDropArea: true
    }
  });
  return (
    <div className='flex w-full h-full'>
      <FormElementsSideBar />
      <div className='p-4 w-full'>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-2 ring-primary'
          )}
        >
          {!droppable.isOver ? (
            <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
              Drop form items here
            </p>
          ) : (
            <div className='p-4 w-full'>
              <div className='h-[120px] rounded-md bg-primary/20'></div>
            </div>
          )}
        </div>
      </div>
      <PropertiesSideBar />
    </div>
  );
};

export default FormDisgner;
