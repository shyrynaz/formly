import FormElementButton from '@/components/builder/FormElementButton';
import {
  ElementType,
  FormElementInstance,
  FormElements
} from '@/components/builder/FormElementInterface';
import FormElementWrapper from '@/components/builder/FormElementWrapper';
import useFormDesigner from '@/hooks/useFormDesigner';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';

const OverlayWrapper = () => {
  const { elements } = useFormDesigner();
  const [draggedElement, setDraggedElement] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: event => {
      setDraggedElement(event.active);
    },
    onDragCancel: () => {
      setDraggedElement(null);
    },
    onDragEnd: () => {
      setDraggedElement(null);
    }
  });
  let node = <p>No drag overlay</p>;
  const isBuilderBtnElement =
    draggedElement?.data?.current?.isBuilderBtnElement;

  if (isBuilderBtnElement) {
    const type = draggedElement?.data?.current?.type as ElementType;
    node = <FormElementButton formElement={FormElements[type]} />;
  }
  const isFormDesignerElement =
    draggedElement?.data?.current?.isFormDesignerElement;

  if (isFormDesignerElement) {
    const elementId = draggedElement?.data?.current?.elementId;
    const element = elements.find(element => element.instanceId === elementId);
    if (!element) node = <div>No Form Element Found</div>;
    else {
      const FormBuilderElement = FormElements[element.type].BuilderComponent;
      node = (
        <div className='flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none'>
          <FormBuilderElement elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default OverlayWrapper;
