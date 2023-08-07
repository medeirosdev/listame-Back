import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { IUserType } from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  name: string;
  email: string;
  login: string;
  password: string;
  type?: IUserType;
  avatar?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    login,
    password,
    type,
    avatar,
  }: Request): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) throw new AppError('Email address already used');

    const loginExists = await this.usersRepository.findByLogin(login);

    if (loginExists) throw new AppError('Login already used');

    if (password.length < 8) {
      throw new AppError('Password needs at least 8 characters');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      login,
      password: hashedPassword,
      status: 'ACTIVE',
      type: type || 'DEFAULT',
      avatar,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
