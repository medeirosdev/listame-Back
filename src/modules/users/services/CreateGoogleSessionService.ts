import { sign } from 'jsonwebtoken';
import { injectable, inject, container } from 'tsyringe';
import { randomPassword } from 'secure-random-password';

import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import axios from 'axios';
import { IGoogleUser } from '@modules/users/types/google';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import { AppErrorCodeEnum } from '@shared/errors/AppErrorCodeEnum';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  token: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class CreateGoogleSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ token }: Request): Promise<Response> {
    const { data: googleUserInfo } = await axios.get<IGoogleUser>(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!googleUserInfo) {
      throw new AppError(
        'Google auth error',
        400,
        AppErrorCodeEnum.SESSION_CREATE_ERROR,
      );
    }

    const { name, email, picture } = googleUserInfo;
    let user = await this.usersRepository.findByEmail(email);

    if (!user) {
      const createUser = container.resolve(CreateUserService);
      user = await createUser.execute({
        name,
        email,
        login: email,
        password: randomPassword({ length: 8 }),
        type: 'GOOGLE',
        avatar: picture,
      });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const sessionToken = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token: sessionToken };
  }
}

export default CreateGoogleSessionService;
