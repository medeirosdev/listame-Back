/* eslint-disable camelcase */
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { AppErrorCodeEnum } from '@shared/errors/AppErrorCodeEnum';
import { injectable, inject } from 'tsyringe';

@injectable()
class DeleteProfileAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user)
      throw new AppError(
        'User not found',
        404,
        AppErrorCodeEnum.USER_MAIL_NOT_FOUND,
      );

    user.avatar = '';
    return this.usersRepository.save(user);
  }
}

export default DeleteProfileAvatarService;
