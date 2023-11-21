'use client';

import { FormElementInstance } from '@/components/builder/FormElementInterface';
import { ReactNode, createContext, useState } from 'react';

type FormDesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
};

export const FormDesignerContext =
  createContext<FormDesignerContextType | null>(null);

export default function FormDesignerContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [formElements, setFormElements] = useState<FormElementInstance[]>([]);

  const addElement = (index: number, element: FormElementInstance) => {
    setFormElements(previous => {
      const newElements = [...previous];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  return (
    <FormDesignerContext.Provider
      value={{ elements: formElements, addElement }}
    >
      {children}
    </FormDesignerContext.Provider>
  );
}
