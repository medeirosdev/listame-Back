import { sign } from 'jsonwebtoken';
import { injectable, inject, container } from 'tsyringe';
import { randomPassword } from 'secure-random-password';

import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import axios from 'axios';
import { IFacebookUser } from '@modules/users/types/facebook';
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
class CreateFacebookSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ token }: Request): Promise<Response> {
    const { data: facebookUserInfo } = await axios.get<IFacebookUser>(
      'https://graph.facebook.com/v14.0/me',
      {
        params: {
          access_token: token,
          fields: 'id,name,email,picture',
        },
      },
    );

    if (!facebookUserInfo) {
      throw new AppError(
        'Google auth error',
        400,
        AppErrorCodeEnum.SESSION_CREATE_ERROR,
      );
    }

    const { name, email, picture } = facebookUserInfo;
    let user = await this.usersRepository.findByEmail(email);

    if (!user) {
      const avatar = picture?.data?.is_silhouette ? '' : picture?.data?.url;
      const createUser = container.resolve(CreateUserService);
      user = await createUser.execute({
        name,
        email,
        login: email,
        password: randomPassword({ length: 8 }),
        type: 'FACEBOOK',
        avatar,
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

export default CreateFacebookSessionService;
