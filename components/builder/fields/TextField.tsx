'use client';
import {
  ElementType,
  FormElement
} from '@/components/builder/FormElementInterface';
import { MdTextFields } from 'react-icons/md';

const type: ElementType = 'TextField';

export const TextFieldElement: FormElement = {
  type,
  construct: (instanceId: string) => ({
    instanceId,
    type,
    elementAttr: {
      label: 'Name',
      helperText: 'helper',
      required: true,
      placeholder: 'Value hoere'
    }
  }),
  BuilderIcon: {
    icon: MdTextFields,
    label: 'TextField'
  },
  BuilderComponent: () => <div>Builder</div>,
  PreviewComponent: () => <div>Designer</div>,
  PropertiesComponent: () => <div>Properties</div>
};
