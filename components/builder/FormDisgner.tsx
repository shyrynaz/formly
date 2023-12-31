'use client';
import PropertiesSideBar from '@/components/builder/PropertiesSideBar';
import React from 'react';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import FormElementsSideBar from '@/components/builder/FormElements';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';
import useFormDesigner from '@/hooks/useFormDesigner';
import {
  ElementType,
  FormElements
} from '@/components/builder/FormElementInterface';
import FormElementWrapper from '@/components/builder/FormElementWrapper';

const FormDisgner = () => {
  const {
    elements,
    addElement,
    setSelectedElement,
    selectedElement,
    removeElement
  } = useFormDesigner();
  const droppable = useDroppable({
    id: 'desiner-drop-area',
    data: {
      isDesignerDropArea: true
    }
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isBuilderBtnElement = active?.data?.current?.isBuilderBtnElement;
      const isDroppingOnDesignerDropArea =
        over?.data?.current?.isDesignerDropArea;
      if (isBuilderBtnElement && isDroppingOnDesignerDropArea) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          uuidv4()
        );
        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverBuilderElement =
        over?.data?.current?.isTopHalf | over?.data?.current?.isBottomHalf;

      if (isDroppingOverBuilderElement && isBuilderBtnElement) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          uuidv4()
        );

        const hoveredId = over?.data?.current?.elementId;

        const hoveredElementIndex = elements?.findIndex(
          element => element.instanceId === hoveredId
        );

        let newElementIndex = hoveredElementIndex;
        if (over?.data?.current?.isBottomHalf) {
          newElementIndex = hoveredElementIndex + 1;
        }
        addElement(newElementIndex, newElement);
        return;
      }

      const isDraggingElement = active?.data?.current?.isFormDesignerElement;

      const draggingOverBuilderElement =
        isDroppingOverBuilderElement && isDraggingElement;

      if (draggingOverBuilderElement) {
        const activeId = active?.data?.current?.elementId;
        const hoveredId = over?.data?.current?.elementId;

        const hoveredElementIndex = elements?.findIndex(
          element => element.instanceId === hoveredId
        );

        const activeElementIndex = elements?.findIndex(
          element => element.instanceId === activeId
        );

        if (activeElementIndex === -1 || hoveredElementIndex === -1) {
          throw new Error('element not found');
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let newElementIndex = hoveredElementIndex;
        if (over?.data?.current?.isBottomHalf) {
          newElementIndex = hoveredElementIndex + 1;
        }
        addElement(newElementIndex, activeElement);
      }
    }
  });

  return (
    <div className='flex w-full h-full'>
      <FormElementsSideBar />
      <div
        className='p-4 w-full'
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-2 ring-primary'
          )}
        >
          {elements.length > 0 && (
            <div className='flex flex-col text-background w-full gap-2 p-4'>
              {elements.map(element => (
                <FormElementWrapper
                  key={element.instanceId}
                  element={element}
                />
              ))}
            </div>
          )}
          {!droppable.isOver && elements.length === 0 && (
            <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
              Drop form items here
            </p>
          )}
          {droppable?.isOver && elements.length === 0 && (
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
