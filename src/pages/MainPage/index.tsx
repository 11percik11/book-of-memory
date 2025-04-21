import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import Header from "../../widgets/Header";
import InformationField from "../../widgets/InformationField";
import styles from "./index.module.scss";
import HeroAwards from "../../widgets/HeroAwards";
import SendlerInformation from "../../widgets/SendlerInformation";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "../../entities/Hero/model/types";

export default function MainPage() {
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      herosurname: '',
      heroname: '',
      heropatronymic: '',
      placebirth: '',
      herocategory: '',
      militaryrank: '',
      birthDateAt: '',
      deathDateAt: '',
      surname: '',
      name: '',
      patronymic: '',
      additionalInformation: '',
      phone: '',
      awards: [{ year: '', title: '', descriptionMilitary: '' }],
      images: [], 
      archive: [],
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
        <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)}>
          <InformationField />
          <hr className={styles.hrLine} />
          <HeroAwards 
          fields={fields}
          onRemove={remove}
          onAppend={() => append({ year: '', title: '', descriptionMilitary: '' })}
          />
          <hr className={styles.hrLine} />
          <SendlerInformation/>
        </form>
      </FormProvider>
    </div>
  );
}
