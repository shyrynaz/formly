import { TextFieldElement } from '@/components/builder/fields/TextField';
import { TitleFieldElement } from '@/components/builder/fields/TitleField';

export type ElementType = 'TextField' | 'TitleField';

export type OnChangeType = (key: string, value: string) => void;

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
    onInputChange?: (key: string, value: string) => void;
    isInvalid?: boolean;
  }>;
  PropertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (element: FormElementInstance, value: string) => boolean;
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
  TextField: TextFieldElement,
  TitleField: TitleFieldElement
};
