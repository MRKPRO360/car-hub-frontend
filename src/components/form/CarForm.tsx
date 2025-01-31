import { ReactNode } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

interface IFormConfig {
  defaultValues?: Record<string, any>;
}

interface IFormProps extends IFormConfig {
  onSubmit: SubmitHandler<FieldValues>;
  children: (methods: any) => ReactNode;
}

function CarForm({ onSubmit, children, defaultValues }: IFormProps) {
  const formConfig: IFormConfig = {};

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
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
