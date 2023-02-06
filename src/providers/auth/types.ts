export type LoginUser = {
  email: string;
  password: string;
};

export enum UserRole {
  ROOT = "ROOT",
  DEFAULT = "DEFAULT",
}

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  priority: number;
};
