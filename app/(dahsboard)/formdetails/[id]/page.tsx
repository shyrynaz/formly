import { GetFormSubmissions, getFormById } from '@/actions/form';
import { StatsCard } from '@/app/(dahsboard)/page';
import {
  ElementType,
  FormElementInstance
} from '@/components/builder/FormElementInterface';
import ViewForm from '@/components/builder/ViewForm';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Checkbox } from '@radix-ui/react-checkbox';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { format, formatDistance } from 'date-fns';
import React, { ReactNode } from 'react';

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
          title='Total Submissions'
          icon={<EyeOpenIcon />}
          subtitle='All time form submissions'
          value={submissions.toLocaleString() || ''}
          loading={false}
          className='shadow-sm shadow-blue-500'
        />
        <StatsCard
          title='Submission Rate'
          icon={<EyeOpenIcon />}
          subtitle='All time form visits'
          value={submissionRate.toLocaleString() || ''}
          loading={false}
          className='shadow-sm shadow-blue-500'
        />
        <StatsCard
          title='Bounce Rate'
          icon={<EyeOpenIcon />}
          subtitle='All time form visits'
          value={bounceRate.toLocaleString() || ''}
          loading={false}
          className='shadow-sm shadow-blue-500'
        />
      </div>
      <Submissions id={form.id} />
    </>
  );
};

export default FormDetailsPage;

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function Submissions({ id }: { id: string }) {
  const form = await GetFormSubmissions(id);
  if (!form) throw new Error('Form does not exist');

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementType;
  }[] = [];

  formElements.forEach(element => {
    switch (element.type) {
      case 'TextField':
        columns.push({
          id: element.instanceId,
          label: element.elementAttr?.label,
          required: element.elementAttr?.required,
          type: element.type
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach(submission => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt
    });
  });

  return (
    <div className='container my-2'>
      <h1>Submissions</h1>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead key={column.id} className='uppercase'>
                  {column.label}
                </TableHead>
              ))}
              <TableHead className='text-muted-foreground text-right uppercase'>
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map(column => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className='text-muted-foreground text-right'>
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function RowCell({ type, value }: { type: ElementType; value: string }) {
  let node: ReactNode = value;

  // switch (type) {
  //   case 'DateField':
  //     if (!value) break;
  //     const date = new Date(value);
  //     node = <Badge variant={'outline'}>{format(date, 'dd/MM/yyyy')}</Badge>;
  //     break;
  //   case 'CheckboxField':
  //     const checked = value === 'true';
  //     node = <Checkbox checked={checked} disabled />;
  //     break;
  // }

  return <TableCell>{node}</TableCell>;
}
