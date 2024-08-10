// FORMS

export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_number: string;
};

export type ForgotPasswordFormType = {
  email: string;
};

export type ResetPasswordFormType = {
  password: string;
  confirmPassword: string;
};
