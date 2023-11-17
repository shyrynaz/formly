import { getFormById } from '@/actions/form';
import FormBuilder from '@/components/builder/FormBuilder';
import React from 'react';

type Params = {
  params: { id: string };
};
const FormBuilderPage = async ({ params: { id } }: Params) => {
  const form = await getFormById(id);
  if (!form) {
    throw new Error('Form does not exist');
  }
  return <FormBuilder form={form} />;
};

export default FormBuilderPage;
