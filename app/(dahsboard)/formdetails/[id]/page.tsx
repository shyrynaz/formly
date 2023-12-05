import { getFormById } from '@/actions/form';
import React from 'react';

type Params = {
  params: { id: string };
};
const FormBuilderPage = async ({ params: { id } }: Params) => {
  const form = await getFormById(id);
  if (!form) {
    throw new Error('Form does not exist');
  }
  return <div>Form details</div>;
};

export default FormBuilderPage;
