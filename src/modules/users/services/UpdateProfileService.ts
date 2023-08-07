/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { AppErrorCodeEnum } from '@shared/errors/AppErrorCodeEnum';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  user_id: string;
  name: string;
  email: string;
  login: string;
  bio: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    login,
    bio,
    old_password,
    password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const emailAlreadyExist = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExist && emailAlreadyExist.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    if (password && !old_password) {
      throw new AppError('You need to inform the old password.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError(
          'Old password does not match.',
          403,
          AppErrorCodeEnum.FORBIDDEN_WRONG_PASSWORD,
        );
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    const loginExists = await this.usersRepository.findByLogin(login);

    if (loginExists && loginExists.id !== user_id) {
      throw new AppError('Login already used');
    }

    user.name = name;
    user.email = email;
    user.login = login;
    user.bio = bio;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
