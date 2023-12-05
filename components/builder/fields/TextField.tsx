'use client';
import {
  ElementType,
  FormElement,
  FormElementInstance
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
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from 'module';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdTextFields } from 'react-icons/md';
import { z } from 'zod';

const type: ElementType = 'TextField';

const elementAttr = {
  label: 'TextField',
  helperText: 'helper',
  required: true,
  placeholder: 'Place holder'
};

const propertiesSchema = z.object({
  label: z.string(),
  helperText: z.string(),
  required: z.boolean().default(false),
  placeholder: z.string()
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

export const TextFieldElement: FormElement = {
  type,
  construct: (instanceId: string) => ({
    instanceId,
    type,
    elementAttr
  }),
  BuilderIcon: {
    icon: MdTextFields,
    label: 'TextField'
  },
  BuilderComponent: TextBuilderComponent,
  PreviewComponent: PreviewComponent,
  PropertiesComponent: PropertiesComponent
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
  const { label, required, placeholder, helperText } = element.elementAttr;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-foreground'>
        {label} {required && '*'}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className='text-[0.8rem] text-muted-foreground'>{helperText}</p>
      )}
    </div>
  );
}

function PreviewComponent({
  elementInstance
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomElementInstance;
  const { label, required, placeholder, helperText } = element.elementAttr;
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-foreground'>
        {label} {required && '*'}
      </Label>
      <Input placeholder={placeholder} />
      {helperText && (
        <p className='text-[0.8rem] text-muted-foreground'>{helperText}</p>
      )}
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
  const { label, required, placeholder, helperText } = element.elementAttr;

  const form = useForm<PropertiesSchema>({
    // resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      helperText,
      required,
      placeholder
    }
  });

  useEffect(() => {
    form.reset(element.elementAttr);
    console.log(element);
  }, [element, form]);

  function applyPropertiesChanges(values: PropertiesSchema) {
    const { helperText, label, placeholder, required } = values;

    updateElement(element.instanceId, {
      ...element,
      elementAttr: {
        label,
        helperText,
        placeholder,
        required
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
          name='label'
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
        <FormField
          control={form.control}
          name='placeholder'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={e => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>Field placeholder on the form</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='helperText'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={e => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Field helper text on the builder
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='required'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
              <div className='space-y-0.5'>
                <FormLabel>Required</FormLabel>

                <FormDescription>Is Field required</FormDescription>
              </div>

              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
