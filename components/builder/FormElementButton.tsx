import { FormElement } from '@/components/builder/FormElementInterface';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import React from 'react';

type FormElementBtn = {
  formElement: FormElement;
};
const FormElementButton = ({ formElement }: FormElementBtn) => {
  const { label, icon: Icon } = formElement.BuilderIcon;
  const draggable = useDraggable({
    id: `form-builder-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isBuilderBtnElement: true
    }
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant={'outline'}
      className={cn(
        'flex flex-col h-[120px] gap-2 w-[120px] cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary'
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className='h-8 w-8 text-primary' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
};
export const FormElementButtonDragOverlay = ({
  formElement
}: FormElementBtn) => {
  const { label, icon: Icon } = formElement.BuilderIcon;

  return (
    <Button
      variant={'outline'}
      className={cn('flex flex-col h-[120px] gap-2 w-[120px] cursor-grab')}
    >
      <Icon className='h-8 w-8 text-primary' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
};

export default FormElementButton;
