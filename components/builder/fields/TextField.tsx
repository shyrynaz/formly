'use client';
import {
  ElementType,
  FormElement,
  FormElementInstance
} from '@/components/builder/FormElementInterface';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MdTextFields } from 'react-icons/md';

const type: ElementType = 'TextField';

const elementAttr = {
  label: 'Names',
  helperText: 'helper',
  required: true,
  placeholder: 'Value hoere'
};

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
  PreviewComponent: () => <div>Designer</div>,
  PropertiesComponent: () => <div>Properties</div>
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
