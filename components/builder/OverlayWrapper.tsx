import FormElementButton from '@/components/builder/FormElementButton';
import {
  ElementType,
  FormElements
} from '@/components/builder/FormElementInterface';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';

const OverlayWrapper = () => {
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
  let node = <p>Hurraaaay dragging</p>;
  const isBuilderBtnElement =
    draggedElement?.data?.current?.isBuilderBtnElement;

  if (isBuilderBtnElement) {
    const type = draggedElement?.data?.current?.type as ElementType;
    node = <FormElementButton formElement={FormElements[type]} />;
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default OverlayWrapper;
