import { FormElements } from '@/components/builder/FormElementInterface';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import useFormDesigner from '@/hooks/useFormDesigner';
import { DialogTrigger } from '@radix-ui/react-dialog';
import React from 'react';
import { MdPreview } from 'react-icons/md';

const PreviewButton = () => {
  const { elements } = useFormDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='gap-2 shadow-none'>
          <MdPreview className='h-6 w-6' />
          Preview Form
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0'>
        <div className='p-4'>
          <p className='text-lg font-bold text-muted-foreground'>
            Form preview
          </p>
          <p className='text-sm font-semibold text-muted-foreground'>
            This is how your final form will appear
          </p>
        </div>
        <div className='bg-accent flex flex-col flex-grow items-center overflow-y-auto p-4'>
          <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-xl p-6 overflow-y-auto'>
            {elements.map(element => {
              const FormPreviewElemet =
                FormElements[element.type]?.PreviewComponent;
              return (
                <FormPreviewElemet
                  key={element.instanceId}
                  elementInstance={element}
                />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewButton;
