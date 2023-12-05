'use client';
import FormDisgner from '@/components/builder/FormDisgner';
import OverlayWrapper from '@/components/builder/OverlayWrapper';
import PreviewButton from '@/components/builder/PreviewButton';
import PublishFormButton from '@/components/builder/PublishFormButton';
import SaveFormBtn from '@/components/builder/SaveFormBtn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import useFormDesigner from '@/hooks/useFormDesigner';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { Form } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { BiArrowFromLeft } from 'react-icons/bi';

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

  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

  if (form.published) {
    return (
      <div className='flex flex-col items-center justify-center h-full w-full p-4'>
        <div className='max-w-md'>
          <h1 className='text-center text-4xl font-bold text-primary border-b pb-2 mb-10'>
            🎊🎊 Form Published 🎊🎊
          </h1>
          <h2 className='text-2xl'>Share this form</h2>
          <h3 className='text-xl text-muted-foreground border-b pb-10'>
            Anyone with the link can view and submit the form
          </h3>
          <div className='my-4 flex flex-col gap-2 items-center w-full border-b pb-4'>
            <Input className='w-full' readOnly value={shareUrl} />
            <Button
              className='mt-2 w-full'
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast({
                  title: 'Copied!',
                  description: 'Link copied to clipboard'
                });
              }}
            >
              Copy link
            </Button>
          </div>
          <div className='flex justify-between'>
            <Button variant={'link'} asChild>
              <Link href={'/'} className='gap-2'>
                <BiArrowFromLeft />
                Go back home
              </Link>
            </Button>
            <Button variant={'link'} asChild>
              <Link href={`/forms/${form.id}`} className='gap-2'>
                Form details
                <BiArrowFromLeft />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            {!form.published ? (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormButton id={form.id} />
              </>
            ) : null}
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
