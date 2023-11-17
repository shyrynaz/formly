import { TextFieldElement } from '@/components/builder/fields/TextField';

export type ElementType = 'TextField';

export type FormElement = {
  type: ElementType;
  BuilderComponent: React.FC;
  PreviewComponent: React.FC;
  PropertiesComponent: React.FC;
};

type FormElementsType = {
  [key in ElementType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldElement
};
