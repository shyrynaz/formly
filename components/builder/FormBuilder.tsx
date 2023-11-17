'use client';
import FormDisgner from '@/components/builder/FormDisgner';
import PreviewButton from '@/components/builder/PreviewButton';
import PublishFormButton from '@/components/builder/PublishFormButton';
import SaveFormBtn from '@/components/builder/SaveFormBtn';
import { DndContext } from '@dnd-kit/core';
import { Form } from '@prisma/client';
import React from 'react';

const FormBuilder = ({ form }: { form: Form }) => {
  return (
    <DndContext>
      <main className='flex flex-col w-full'>
        <nav className='flex justify-between border-b-2 gap-3 p-4 items-center'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form: </span>
            {form.name}
          </h2>
          <div className='flex items-center gap-2'>
            <PreviewButton />
            <SaveFormBtn />
            <PublishFormButton />
          </div>
        </nav>
        <div className='flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200]px bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
          <FormDisgner />
        </div>
      </main>
    </DndContext>
  );
};

export default FormBuilder;
