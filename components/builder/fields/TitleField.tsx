'use client';
import {
  ElementType,
  FormElement,
  FormElementInstance,
  OnChangeType
} from '@/components/builder/FormElementInterface';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useFormDesigner from '@/hooks/useFormDesigner';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from 'module';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHeading } from 'react-icons/fa';
import { MdTextFields } from 'react-icons/md';
import { z } from 'zod';

const type: ElementType = 'TitleField';

const elementAttr = {
  title: 'Title Field'
};

const propertiesSchema = z.object({
  title: z.string()
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

export const TitleFieldElement: FormElement = {
  type,
  construct: (instanceId: string) => ({
    instanceId,
    type,
    elementAttr
  }),
  BuilderIcon: {
    icon: FaHeading,
    label: 'Title Field'
  },
  BuilderComponent: TextBuilderComponent,
  PreviewComponent: PreviewComponent,
  PropertiesComponent: PropertiesComponent,
  validate: (element: FormElementInstance, value: string) => {
    return true;
  }
};

type CustomElementInstance = FormElementInstance & {
  elementAttr: typeof elementAttr;
};

function TextBuilderComponent({
  elementInstance
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomElementInstance;
  const { title } = element.elementAttr;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-foreground'>Form Title</Label>
      <p className='text-lg'>{title}</p>
    </div>
  );
}

function PreviewComponent({
  elementInstance,
  onInputChange
}: {
  elementInstance: FormElementInstance;
  onInputChange?: OnChangeType;
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const element = elementInstance as CustomElementInstance;
  const { title } = element.elementAttr;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className={cn(error ? 'text-red-600' : 'text-foreground')}>
        {title}
      </Label>
    </div>
  );
}

function PropertiesComponent({
  elementInstance
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElement } = useFormDesigner();
  const element = elementInstance as CustomElementInstance;
  const { title } = element.elementAttr;

  const form = useForm<PropertiesSchema>({
    // resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      title
    }
  });

  useEffect(() => {
    form.reset(element.elementAttr);
    console.log(element);
  }, [element, form]);

  function applyPropertiesChanges(values: PropertiesSchema) {
    const { title } = values;

    updateElement(element.instanceId, {
      ...element,
      elementAttr: {
        title
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyPropertiesChanges)}
        className='space-y-3'
        onSubmit={e => e.preventDefault()}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={e => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>Field label on the form</FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
