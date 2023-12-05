import { TextFieldElement } from '@/components/builder/fields/TextField';

export type ElementType = 'TextField';

export type FormElement = {
  type: ElementType;
  construct: (instanceId: string) => FormElementInstance;
  BuilderIcon: {
    icon: React.ElementType;
    label: string;
  };
  BuilderComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  PreviewComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  PropertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

export type FormElementInstance = {
  instanceId: string;
  type: ElementType;
  elementAttr?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldElement
};
