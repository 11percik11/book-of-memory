import * as yup from 'yup';

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