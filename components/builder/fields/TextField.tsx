'use client';
import {
  ElementType,
  FormElement
} from '@/components/builder/FormElementInterface';

const type: ElementType = 'TextField';

export const TextFieldElement: FormElement = {
  type,
  BuilderComponent: () => <div>Builder</div>,
  PreviewComponent: () => <div>Designer</div>,
  PropertiesComponent: () => <div>Properties</div>
};
