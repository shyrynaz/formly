import { saveFormContent } from '@/actions/form';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import useFormDesigner from '@/hooks/useFormDesigner';
import React, { useTransition } from 'react';
import { HiSaveAs } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';

const SaveFormBtn = ({ id }: { id: string }) => {
  const { elements } = useFormDesigner();
  const [loading, startTransition] = useTransition();

  const saveFormContents = async () => {
    try {
      const stringifiedElements = JSON.stringify(elements);
      await saveFormContent(id, stringifiedElements);
      toast({ title: 'Success', description: 'Form has been updated' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error updating your form',
        variant: 'destructive'
      });
    }
  };
  return (
    <Button
      variant={'outline'}
      className='gap-2 shadow-none'
      disabled={loading}
      onClick={() => {
        startTransition(saveFormContents);
      }}
    >
      <HiSaveAs className='h-6 w-6' />
      Save Form
      {loading && <FaSpinner className='animate-spin' />}
    </Button>
  );
};

export default SaveFormBtn;
