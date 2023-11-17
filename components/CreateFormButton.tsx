'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircledIcon, ReloadIcon } from '@radix-ui/react-icons';
import { toast } from '@/components/ui/use-toast';
import { schemaType, schema } from '@/schemas/form';
import { CreateForm } from '@/actions/form';
import { useRouter } from 'next/navigation';

const CreateFormButton = () => {
  const router = useRouter();
  const form = useForm<schemaType>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: schemaType) => {
    try {
      const formId = await CreateForm(values);
      router.push(`/builder/${formId}`);

      toast({
        title: 'Success',
        description: 'Form created.',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, Try again',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4'
        >
          <PlusCircledIcon className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
          <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>
            Create new form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2 py-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className='w-full mt-3'
          >
            {form.formState.isSubmitting ? (
              <ReloadIcon className=' animate-spin' />
            ) : null}
            {!form.formState.isSubmitting ? <span>Save</span> : null}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormButton;
