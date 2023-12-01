import { FormElements } from '@/components/builder/FormElementInterface';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useFormDesigner from '@/hooks/useFormDesigner';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const PropertiesSideBar = () => {
  const { selectedElement, setSelectedElement } = useFormDesigner();
  if (!selectedElement)
    return (
      <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
        {!selectedElement ? (
          <div className='h-full w-full flex flex-col justify-center items-center'>
            Select Item to view properties
          </div>
        ) : null}
      </aside>
    );
  const PropertiesForm =
    FormElements[selectedElement?.type].PropertiesComponent;
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted bg-background overflow-y-auto h-full'>
      <div className='flex px-4 py-2 justify-between items-center font-bold'>
        <p className='text-sm text-foreground/70'>Properties</p>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className='mb-4' />
      <div className='p-4'>
        <PropertiesForm elementInstance={selectedElement} />
      </div>
    </aside>
  );
};

export default PropertiesSideBar;
