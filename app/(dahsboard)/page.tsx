import { GetFormStats } from '@/actions/form';
import CreateFormButton from '@/components/CreateFormButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { EyeOpenIcon } from '@radix-ui/react-icons';
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
        <CreateFormButton />
        <CreateFormButton />
        <CreateFormButton />
        <CreateFormButton />
        <CreateFormButton />
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
function StatsCard(props: StatsCardProps) {
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
