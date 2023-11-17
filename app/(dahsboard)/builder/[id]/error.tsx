'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react';

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.log(error, 'error');
  }, [error]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <h1 className=' text-3xl text-destructive'>Something Went Wrong!!</h1>
      <Button asChild>
        <Link href='/home'>Go back Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
