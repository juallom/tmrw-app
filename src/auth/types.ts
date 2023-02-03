export type LoginUser = {
  email: string;
  password: string;
};

export type SignupUser = LoginUser & {
  firstName: string;
  lastName?: string;
};
