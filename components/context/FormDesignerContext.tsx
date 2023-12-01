'use client';

import { FormElementInstance } from '@/components/builder/FormElementInterface';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState
} from 'react';

type FormDesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: FormElementInstance) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
};

export const FormDesignerContext =
  createContext<FormDesignerContextType | null>(null);

export default function FormDesignerContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [formElements, setFormElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);
  const addElement = (index: number, element: FormElementInstance) => {
    setFormElements(previous => {
      const newElements = [...previous];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setFormElements(previous => {
      const newElements = previous.filter(element => element.instanceId !== id);
      return newElements;
    });
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setFormElements(previous => {
      const newElements = [...previous];
      const elementIndex = newElements.findIndex(
        element => element.instanceId === id
      );
      newElements[elementIndex] = element;
      return newElements;
    });
  };

  return (
    <FormDesignerContext.Provider
      value={{
        elements: formElements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement
      }}
    >
      {children}
    </FormDesignerContext.Provider>
  );
}
