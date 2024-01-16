import { getFormByUrl } from '@/actions/form';
import { FormElementInstance } from '@/components/builder/FormElementInterface';
import FormSubmit from '@/components/builder/FormSubmit';
import React from 'react';

export default async function SubmitForm({
  params
}: {
  params: { formLink: string };
}) {
  const form = await getFormByUrl(params.formLink);

  if (!form) throw new Error('Form does not exist');
  const content = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmit url={params.formLink} formContent={content} />;
}
