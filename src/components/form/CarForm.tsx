import { ReactNode } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

interface IFormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IFormProps extends IFormConfig {
  onSubmit: SubmitHandler<FieldValues>;
  children: (methods: any) => ReactNode;
}

function CarForm({ onSubmit, children, defaultValues, resolver }: IFormProps) {
  const formConfig: IFormConfig = {};

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }

  if (resolver) {
    formConfig['resolver'] = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children(methods)}</form>
    </FormProvider>
  );
}

export default CarForm;
