import { PublishForm } from '@/actions/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { MdOutlinePublish } from 'react-icons/md';

const PublishFormButton = ({ id }: { id: string }) => {
  const [loading, startTransition] = useTransition();

  const router = useRouter();

  const publishForm = async () => {
    try {
      await PublishForm(id);
      toast({ title: 'Success', description: 'Your Form has been published' });
      router.refresh();
    } catch (error) {
      toast({ title: 'Error', description: 'Something went wrong' });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='gap-2 shadow-none bg-gradient-to-r from-indigo-400 to-cyan-300'>
          <MdOutlinePublish className='h-6 w-6' />
          Publish Form
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are your you want to publish this form/survey?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form. <br />
            <span className='font-medium'>
              By publishing this form, it will be available to the public and
              you will be able to collect responses.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            disabled={loading}
            onClick={e => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Publish form
            {loading && <FaSpinner className='animate-spin' />}
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormButton;
