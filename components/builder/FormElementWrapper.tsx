import {
  FormElementInstance,
  FormElements
} from '@/components/builder/FormElementInterface';
import { Button } from '@/components/ui/button';
import useFormDesigner from '@/hooks/useFormDesigner';
import { cn } from '@/lib/utils';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import React, { useState } from 'react';
import { BiSolidTrash } from 'react-icons/bi';

interface ElementWrapperProps {
  element: FormElementInstance;
}

const FormElementWrapper = ({ element }: ElementWrapperProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const { removeElement, setSelectedElement } = useFormDesigner();
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

  const draggable = useDraggable({
    id: `${element.instanceId}_drag`,
    data: {
      type: element.type,
      elementId: element.instanceId,
      isFormDesignerElement: true
    }
  });

  if (draggable.isDragging) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={e => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
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
              onClick={e => {
                e.stopPropagation();
                removeElement(element.instanceId);
              }}
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
      {topHalf.isOver && (
        <div className='absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none' />
      )}
      {bottomHalf.isOver && (
        <div className='absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none' />
      )}
      <div
        className={cn(
          'flex w-full h-[120px] items-center rounded-md bg-accent/30 px-4 py-2 pointer-events-none opacity-100',
          isMouseOver && 'opacity-30'
        )}
      >
        <BuilderElement elementInstance={element} />
      </div>
    </div>
  );
};

export default FormElementWrapper;
