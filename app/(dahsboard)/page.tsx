import { GetFormStats, GetForms } from '@/actions/form';
import CreateFormButton from '@/components/CreateFormButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Form } from '@prisma/client';
import {
  ArrowRightIcon,
  EnvelopeClosedIcon,
  EyeOpenIcon,
  Pencil1Icon
} from '@radix-ui/react-icons';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className='container'>
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6' />
      <h2 className='text-3xl font-bold col-span-2'>Your Forms</h2>
      <Separator className='my-6' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map(el => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();

  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;
  return (
    <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      <StatsCard
        title='Total Visits'
        icon={<EyeOpenIcon />}
        subtitle='All time form visits'
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
        className='shadow-sm shadow-blue-500'
      />
      <StatsCard
        title='Total Visits'
        icon={<EyeOpenIcon />}
        subtitle='All time form visits'
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
        className='shadow-sm shadow-blue-500'
      />
      <StatsCard
        title='Total Visits'
        icon={<EyeOpenIcon />}
        subtitle='All time form visits'
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
        className='shadow-sm shadow-blue-500'
      />
      <StatsCard
        title='Total Visits'
        icon={<EyeOpenIcon />}
        subtitle='All time form visits'
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
        className='shadow-sm shadow-blue-500'
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  value: string;
  loading: boolean;
  className: string;
}
export function StatsCard(props: StatsCardProps) {
  const { title, icon, className, subtitle, loading, value } = props;
  return (
    <Card className={className}>
      <CardHeader className='flex justify-between items-center flex-row'>
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {loading ? (
            <Skeleton>
              <span className='opacity-0'>0</span>
            </Skeleton>
          ) : null}
          {!loading && value}
        </div>
        <p className='text-xs text-muted-foreground pt-2'>{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className='border-2 border-primary-/20 h-[190px] w-full' />;
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map(form => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 justify-between'>
          <span className='truncate font-bold'>{form.name}</span>
          {form.published ? (
            <Badge>Publised</Badge>
          ) : (
            <Badge variant='destructive'>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true
          })}
          {!form.published ? (
            <>
              <span className='flex items-center gap-2 font-semibold'>
                <EyeOpenIcon className='text-muted-foreground' />
                <span>{form.visits.toLocaleString()}</span>
                <EnvelopeClosedIcon className='text-muted-foreground' />
                <span>{form.submissions.toLocaleString()}</span>
              </span>
            </>
          ) : null}
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
        {form.description || 'No descriprion'}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button asChild className='w-full mt-2 text-md gap-4'>
            <Link href={`/formdetails/${form.id}`}>
              View submissions <ArrowRightIcon />
            </Link>
          </Button>
        ) : (
          <Button
            variant={'outline'}
            asChild
            className='w-full mt-2 text-md gap-4'
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <Pencil1Icon />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
