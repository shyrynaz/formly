import { getFormById } from '@/actions/form';
import { StatsCard } from '@/app/(dahsboard)/page';
import ViewForm from '@/components/builder/ViewForm';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import React from 'react';

type Params = {
  params: { id: string };
};
const FormDetailsPage = async ({ params: { id } }: Params) => {
  const form = await getFormById(id);
  if (!form) {
    throw new Error('Form does not exist');
  }

  const { visits, submissions } = form;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;
  return (
    <>
      <div className='py-5 border-b border-muted'>
        <div className='flex w-full justify-between container'>
          <h1 className='text-3xl font-bold truncate '>{form.name}</h1>
          <ViewForm shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container'>
        <StatsCard
          title='Total Visits'
          icon={<EyeOpenIcon />}
          subtitle='All time form visits'
          value={visits.toLocaleString() || ''}
          loading={false}
          className='shadow-sm shadow-blue-500'
        />
        <StatsCard
          title='Total Visits'
          icon={<EyeOpenIcon />}
          subtitle='All time form visits'
          value={visits.toLocaleString() || ''}
          loading={false}
          className='shadow-sm shadow-blue-500'
        />
        <StatsCard
          title='Total Visits'
          icon={<EyeOpenIcon />}
          subtitle='All time form visits'
          value={visits.toLocaleString() || ''}
          loading={false}
          className='shadow-sm shadow-blue-500'
        />
        <StatsCard
          title='Total Visits'
          icon={<EyeOpenIcon />}
          subtitle='All time form visits'
          value={visits.toLocaleString() || ''}
          loading={false}
          className='shadow-sm shadow-blue-500'
        />
      </div>
    </>
  );
};

export default FormDetailsPage;
