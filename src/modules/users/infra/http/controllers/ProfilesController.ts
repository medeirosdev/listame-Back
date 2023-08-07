/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfilesController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showUser = container.resolve(ShowProfileService);

    const user = await showUser.execute({ user_id });

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    console.log(req.body);
    const { name, email, login, bio, old_password, password } = req.body;

    const updateUser = container.resolve(UpdateProfileService);

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      login,
      bio,
      old_password,
      password,
    });

    return res.json(classToClass(user));
  }
}
