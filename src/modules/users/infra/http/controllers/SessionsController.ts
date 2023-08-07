/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSessionService from '@modules/users/services/CreateSessionService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateGoogleSessionService from '@modules/users/services/CreateGoogleSessionService';
import CreateFacebookSessionService from '@modules/users/services/CreateFacebookSessionService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const userSession = container.resolve(CreateSessionService);
    const { user, token } = await userSession.execute({
      email,
      password,
    });
    return res.json({ user: classToClass(user), token });
  }

  public async isValid(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    req.headers.authorization = req.body?.token || '';

    let valid = false;
    try {
      ensureAuthenticated(req, res, next);
      valid = true;
    } catch (err) {
      valid = false;
    }

    return res.json(valid);
  }

  public async createGoogle(req: Request, res: Response): Promise<Response> {
    const { token: googleAccessToken } = req.body;

    const googleUserSession = container.resolve(CreateGoogleSessionService);

    const { user, token } = await googleUserSession.execute({
      token: googleAccessToken,
    });

    return res.json({ user: classToClass(user), token });
  }

  public async createFacebook(req: Request, res: Response): Promise<Response> {
    const { token: facebookAccessToken } = req.body;

    const facebookUserSession = container.resolve(CreateFacebookSessionService);

    const { user, token } = await facebookUserSession.execute({
      token: facebookAccessToken,
    });

    return res.json({ user: classToClass(user), token });
  }
}
