/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateAgendaAvatarService from '@modules/agendas/services/UpdateAgendaAvatarService';
import DeleteAgendaAvatarService from '@modules/agendas/services/DeleteAgendaAvatarService';

export default class AgendasAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id } = req.params;

    const updateAgendaAvatar = container.resolve(UpdateAgendaAvatarService);

    const agenda = await updateAgendaAvatar.execute({
      user_id,
      agendaId: id,
      avatarFileName: req.file.filename,
    });

    return res.json(classToClass(agenda));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteAgendaAvatar = container.resolve(DeleteAgendaAvatarService);

    const agenda = await deleteAgendaAvatar.execute(id);

    return res.json(classToClass(agenda));
  }
}
