import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import Header from "../../widgets/Header";
// import InformationField from "../../widgets/InformationField";
import styles from "./index.module.scss";
import HeroAwards from "../../widgets/HeroAwards";
import SendlerInformation from "../../widgets/SendlerInformation";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "../../entities/Hero/model/types";

export default function MainPage() {
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      surname: '',
      name: '',
      patronymic: '',
      phone: '',
      awards: [{ year: '', title: '' }] // Добавьте начальные значения для всех обязательных полей
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'awards'
  });
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("Form Data:", data); 
  };

  console.log('Errors:', methods.formState.errors);

  console.log(fields);
  

  return (
    <div className={styles.mainpage}>
      <Header />
      <hr className={styles.hrLine} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* <InformationField /> */}
          <hr className={styles.hrLine} />
          <HeroAwards 
          fields={fields}
          onRemove={remove}
          onAppend={() => append({ year: '', title: '' })}
          />
          <hr className={styles.hrLine} />
          <SendlerInformation/>
        </form>
      </FormProvider>
    </div>
  );
}
