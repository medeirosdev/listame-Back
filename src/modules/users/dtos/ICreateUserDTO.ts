export type IUserType = 'DEFAULT' | 'ADMIN' | 'GUEST' | 'GOOGLE' | 'FACEBOOK';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  login: string;
  password: string;
  status: string;
  type: IUserType;
  avatar?: string;
}
