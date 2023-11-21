import {
  FormElementInstance,
  FormElements
} from '@/components/builder/FormElementInterface';
import React from 'react';

interface ElementWrapperProps {
  element: FormElementInstance;
}

const FormElementWrapper = ({ element }: ElementWrapperProps) => {
  const BuilderElement = FormElements[element.type].BuilderComponent;

  return (
    <div className='flex w-full h-[120px] items-center rounded-md bg-accent/30 px-4 py-2 pointer-events-none'>
      <BuilderElement elementInstance={element} />;
    </div>
  );
};

export default FormElementWrapper;
