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

export type PreRegistration = {
  /** User ID */
  id: string;
  name: string;
  email: string;
  nickname: string | null;
};
