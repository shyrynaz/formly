import {
  FormElementInstance,
  FormElements
} from '@/components/builder/FormElementInterface';
import { Button } from '@/components/ui/button';
import useFormDesigner from '@/hooks/useFormDesigner';
import { useDroppable } from '@dnd-kit/core';
import React, { useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';

interface ElementWrapperProps {
  element: FormElementInstance;
}

const FormElementWrapper = ({ element }: ElementWrapperProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const { removeElement } = useFormDesigner();
  const topHalf = useDroppable({
    id: `${element.instanceId}-top`,
    data: {
      type: element.type,
      elementId: element.instanceId,
      isTopHalf: true
    }
  });
  const bottomHalf = useDroppable({
    id: `${element.instanceId}-bottom`,
    data: {
      type: element.type,
      elementId: element.instanceId,
      isBottomHalf: true
    }
  });

  const BuilderElement = FormElements[element.type].BuilderComponent;

  return (
    <div
      className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div
        ref={topHalf.setNodeRef}
        className='absolute  w-full h-1/2 rounded-t-md'
      />
      <div
        ref={bottomHalf.setNodeRef}
        className='absolute  bottom-0 w-full h-1/2 rounded-b-md'
      />
      {isMouseOver && (
        <>
          <div className='absolute right-0 h-full'>
            <Button
              className='h-full flex justify-center border rounded-md rounded-l-none bg-red-500'
              variant='outline'
              onClick={() => removeElement(element.instanceId)}
            >
              <BiSolidTrash className='h-6 w-6' />
            </Button>
          </div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse '>
            <p className='text-muted-foreground'>
              Click to see properties or drag to change position
            </p>
          </div>
        </>
      )}
      <div className='flex w-full h-[120px] items-center rounded-md bg-accent/30 px-4 py-2 pointer-events-none'>
        <BuilderElement elementInstance={element} />
      </div>
    </div>
  );
};

export default FormElementWrapper;
