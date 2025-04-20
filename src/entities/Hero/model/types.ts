import * as yup from "yup";

// export interface HeroImage {
//     id: number;
//     image: string;
//     applicationForm: string; // URL
//     imageFile: string; // Base64 или путь к файлу
//   }

//   export interface HeroArchive {
//     id: number;
//     media: string;
//     applicationForm: string; // URL
//     mediaFile: string;
//   }

//   export interface HeroAward {
//     id: number;
//     heroAward: string; // URL
//     yearAt: string; // Год вручения (можно заменить на Date)
//     description: string;
//     applicationForm: string; // URL
//     title: string;
//   }

//   export interface Hero {
//     id: number;
//     surname: string;
//     name: string;
//     patronymic: string;
//     militaryRank: string;
//     birthDateAt: string; // Можно заменить на Date
//     additional?: string; // Опциональное поле
//     surnameSender: string;
//     nameSender: string;
//     patronymicSender: string;
//     phone: string;
//     category: string;
//     deathDateAt: string; // Можно заменить на Date
//     city: string;
//     images: HeroImage[];
//     archive: HeroArchive[];
//     heroAward: HeroAward[];
//     status: string;
//     heroAwardAll: string;
//     sender: string;
//     media: string;
//   }

//   const imageSchema = yup.object({
//     id: yup.number().required(),
//     image: yup.string().required(),
//     applicationForm: yup.string().url().required(),
//     imageFile: yup.string().required(),
//   });

//   // Схема для архива
//   const archiveSchema = yup.object({
//     id: yup.number().required(),
//     media: yup.string().required(),
//     applicationForm: yup.string().url().required(),
//     mediaFile: yup.string().required(),
//   });

//   // Схема для наград
//   const heroAwardSchema = yup.object({
//     id: yup.number().required(),
//     heroAward: yup.string().url().required(),
//     yearAt: yup.string().required(),
//     description: yup.string().required(),
//     applicationForm: yup.string().url().required(),
//     title: yup.string().required(),
//   });

//   // Основная схема
//   export const heroFormSchema = yup.object({
//     id: yup.number().required(),
//     surname: yup.string().required(),
//     name: yup.string().required(),
//     patronymic: yup.string().required(),
//     militaryRank: yup.string().required(),
//     birthDateAt: yup.string().required(),
//     additional: yup.string(),
//     surnameSender: yup.string().required(),
//     nameSender: yup.string().required(),
//     patronymicSender: yup.string().required(),
//     phone: yup.string().required(),
//     category: yup.string().required(),
//     deathDateAt: yup.string().required(),
//     city: yup.string().required(),
//     images: yup.array().of(imageSchema).required(),
//     archive: yup.array().of(archiveSchema).required(),
//     heroAward: yup.array().of(heroAwardSchema).required(),
//     status: yup.string().required(),
//     heroAwardAll: yup.string().required(),
//     sender: yup.string().required(),
//     media: yup.string().required(),
//   });

export interface HeroImage {
  // id: number;
  image: string;
  applicationForm: string; // URL
  imageFile: string; // Base64 или путь к файлу
}

export interface HeroArchive {
  id: number;
  media: string;
  applicationForm: string; // URL
  mediaFile: string;
}

export interface HeroAward {
  id: number;
  heroAward: string; // URL
  yearAt: string; // Год вручения (можно заменить на Date)
  description: string;
  applicationForm: string; // URL
  title: string;
}

export interface Hero {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  militaryRank: string;
  birthDateAt: string; // Можно заменить на Date
  additional?: string; // Опциональное поле
  surnameSender: string;
  nameSender: string;
  patronymicSender: string;
  phone: string;
  category: string;
  deathDateAt: string; // Можно заменить на Date
  city: string;
  images: HeroImage[];
  archive: HeroArchive[];
  heroAward: HeroAward[];
  status: string;
  heroAwardAll: string;
  sender: string;
  media: string;
}

export interface PersonalDataAccept {
  id: number;
  description: string;
}

export interface MilitaryRanks {
  id: number;
  category: string;
  title: string;
}

export interface heroAwardAll {
  id: number;
  category: string;
  title: string;
}

const regExpPhone: RegExp = new RegExp(/^\+?[1-9][0-9]{7,14}$/)
const regExpLetters: RegExp = new RegExp(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)

export const schema = yup.object().shape({
  surname: yup.string()
  .required('Фамилия обязательна')
  .matches(regExpLetters, 'Не должно содержать цифр и спецсимволов'),
  name: yup.string()
  .required('Имя обязательно')
  .matches(regExpLetters, 'Не должно содержать цифр и спецсимволов'),
  patronymic: yup.string()
  .test('patronymic', 'Не должно содержать цифр и спецсимволов', 
    (v) => !v?.trim() || regExpLetters.test(v))
  .nullable()
  .notRequired(),
  phone: yup.string()
    .required('Телефон обязателен')
    .min(11, 'Номер телефона слишком короткий (должно быть 11 символов)')
    .max(11, 'Номер телефона слишком длинный (должно быть 11 символов)')
    .matches(regExpPhone, 'Неверный формат телефона'), 
  awards: yup.array().of(
    yup.object().shape({
      year: yup.string()
        .required('Год обязателен')
        .typeError('Год должен быть числом'),
        // .max(new Date().getFullYear(), 'Год не может быть в будущем')
        // .min(1900, 'Год не может быть меньше 1900'),
      title: yup.string()
      .required('Название награды обязательно')
    })
  )
});

const imageSchema = yup.object({
  id: yup.number().required(),
  image: yup.string().required(),
  applicationForm: yup.string().url().required(),
  imageFile: yup.string().required(),
});

// Схема для архива
const archiveSchema = yup.object({
  id: yup.number().required(),
  media: yup.string().required(),
  applicationForm: yup.string().url().required(),
  mediaFile: yup.string().required(),
});

// Схема для наград
const heroAwardSchema = yup.object({
  id: yup.number().required(),
  heroAward: yup.string().url().required(),
  yearAt: yup.string().required(),
  description: yup.string().required(),
  applicationForm: yup.string().url().required(),
  title: yup.string().required(),
});

// Основная схема
export const heroFormSchema = yup.object({
  // id: yup.number().required(),
  surname: yup.string().required(),
  name: yup.string().required(),
  patronymic: yup.string().required(),
  militaryRank: yup.string().required(),
  birthDateAt: yup.string().required(),
  deathDateAt: yup.string().required(),
  city: yup.string().required(),
  additional: yup.string(),
  images: yup.array().of(imageSchema).required(),

  surnameSender: yup.string().required(),
  nameSender: yup.string().required(),
  patronymicSender: yup.string().required(),
  phone: yup.string().required(),

  category: yup.string().required(),

  archive: yup.array().of(archiveSchema).required(),
  heroAward: yup.array().of(heroAwardSchema).required(),

  status: yup.string().required(),
  heroAwardAll: yup.string().required(),
  sender: yup.string().required(),
  media: yup.string().required(),
});
