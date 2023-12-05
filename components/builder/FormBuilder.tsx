'use client';
import FormDisgner from '@/components/builder/FormDisgner';
import OverlayWrapper from '@/components/builder/OverlayWrapper';
import PreviewButton from '@/components/builder/PreviewButton';
import PublishFormButton from '@/components/builder/PublishFormButton';
import SaveFormBtn from '@/components/builder/SaveFormBtn';
import useFormDesigner from '@/hooks/useFormDesigner';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { Form } from '@prisma/client';
import React, { useEffect } from 'react';

const FormBuilder = ({ form }: { form: Form }) => {
  const { setFormElements } = useFormDesigner();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10 //10px
    }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5
    }
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  useEffect(() => {
    if (form.content) {
      const parsedContent = JSON.parse(form.content);
      setFormElements(parsedContent);
    }
  }, [form, setFormElements]);
  return (
    <DndContext sensors={sensors}>
      <main className='flex flex-col w-full'>
        <nav className='flex justify-between border-b-2 gap-3 p-4 items-center'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form: </span>
            {form.name}
          </h2>
          <div className='flex items-center gap-2'>
            <PreviewButton />
            <SaveFormBtn id={form.id} />
            <PublishFormButton />
          </div>
        </nav>
        <div className='flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200]px bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
          <FormDisgner />
        </div>
      </main>
      <OverlayWrapper></OverlayWrapper>
    </DndContext>
  );
};

export default FormBuilder;
