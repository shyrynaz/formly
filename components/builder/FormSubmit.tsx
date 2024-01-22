'use client';

import { SubmitFormResponses } from '@/actions/form';
import {
  FormElementInstance,
  FormElements
} from '@/components/builder/FormElementInterface';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import React, { useRef, useState, useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';

type FormSubmitProps = {
  url: string;
  formContent: FormElementInstance[];
};
const FormSubmit = ({ url, formContent }: FormSubmitProps) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErros = useRef<{ [key: string]: boolean }>({});
  const [loading, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const onInputValueChange = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const submit = async () => {
    try {
      const payload = JSON.stringify(formValues.current);
      await SubmitFormResponses(url, payload);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive'
      });
    }
  };

  if (submitted) {
    return (
      <div className='flex justify-center items-center h-full w-full'>
        you have successfully submitted your form
      </div>
    );
  }

  return (
    <div className='flex justify-center w-full h-full items-center p-8 '>
      <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-md  rounded'>
        {formContent.map(element => {
          const Element = FormElements[element.type].PreviewComponent;
          return (
            <Element
              key={element.instanceId}
              elementInstance={element}
              onInputChange={onInputValueChange}
            />
          );
        })}
        <Button onClick={() => startTransition(submit)}>
          {loading ? <FaSpinner className='animate-spin' /> : null}{' '}
          {loading ? 'Submitting responses ...' : 'Submit Responses'}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmit;
