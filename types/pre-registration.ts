export type PreRegistrationFormValues = {
  name: string;
  email: string;
  phone: string;
  nickname: string;
};

export type PreRegistrationBody = {
  name: string;
  email: string;
  phone: string;
  nickname: string | null;
};

/**
 * If you modify this type make sure to modify the schema in /middlewares/handle-pre-registration.ts as well
 */
export type PreRegistration = {
  id: string /** User ID */;
  leadId: string;
  name: string;
  email: string;
  nickname: string | null;
};
