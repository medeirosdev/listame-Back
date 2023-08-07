/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAgendaService from '@modules/agendas/services/CreateAgendaService';
import ShowAllAgendaService from '@modules/agendas/services/ShowAllAgendaService';
import ShowAgendaProfileService from '@modules/agendas/services/ShowAgendaProfileService';
import UpdateAgendaService from '@modules/agendas/services/UpdateAgendaService';
import DeleteAgendaService from '@modules/agendas/services/DeleteAgendaService';
import ShowAgendasFilterService from '@modules/agendas/services/ShowAgendasFilterService';
import ShowAgendaService from '@modules/agendas/services/ShowAgendaService';
import FollowAgendaService from '@modules/agendas/services/FollowAgendaService';
import UnfollowAgendaService from '@modules/agendas/services/UnfollowAgendaService';
import ShowAgendaFollowersService from '@modules/agendas/services/ShowAgendaFollowersService';
import ShowUserAgendaRoleService from '@modules/agendas/services/ShowUserAgendaRoleService';

export default class AgendasController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, description, isPrivate } = req.body;

    const createAgenda = container.resolve(CreateAgendaService);

    const agenda = await createAgenda.execute({
      name,
      description,
      createdBy: user_id,
      isPrivate,
    });

    return res.json(classToClass(agenda));
  }

  public async follow(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id: agendaId } = req.params;

    const followAgenda = container.resolve(FollowAgendaService);

    const agenda = await followAgenda.execute({
      userId: user_id,
      agendaId,
    });

    return res.json(classToClass(agenda));
  }

  public async unfollow(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id: agendaId } = req.params;

    const unfollowAgenda = container.resolve(UnfollowAgendaService);

    const agenda = await unfollowAgenda.execute({
      userId: user_id,
      agendaId,
    });

    return res.json(classToClass(agenda));
  }

  public async  index(req: Request, res: Response): Promise<Response> {
    const showAllAgenda = container.resolve(ShowAllAgendaService);

    const agenda = await showAllAgenda.execute();

    return res.json(classToClass(agenda));
  }

  public async filter(req: Request, res: Response): Promise<Response> {
    const { agendasIds } = req.body;

    const showAgendasFilter = container.resolve(ShowAgendasFilterService);

    const agenda = await showAgendasFilter.execute(agendasIds);

    return res.json(classToClass(agenda));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user.id;

    const showAgenda = container.resolve(ShowAgendaService);

    const agenda = await showAgenda.execute(id);

    const showAgendaUserRole = container.resolve(ShowUserAgendaRoleService);

    const role = await showAgendaUserRole.execute({
      agendaId: id,
      userId,
    });

    return res.json({ ...classToClass(agenda), role });
  }

  public async showRole(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id: agendaId } = req.params;

    const showUserAgendaRole = container.resolve(ShowUserAgendaRoleService);
    
    const role = await showUserAgendaRole.execute({
      userId,
      agendaId,
    });

    return res.json({ role });
  }

  public async indexProfile(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showAgenda = container.resolve(ShowAgendaProfileService);

    const agenda = await showAgenda.execute(id);

    return res.json(classToClass(agenda));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, isPrivate } = req.body;

    const updateAgenda = container.resolve(UpdateAgendaService);

    const agenda = await updateAgenda.execute({
      id,
      name,
      description,
      isPrivate,
    });

    return res.json(classToClass(agenda));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.query;

    const deleteAgenda = container.resolve(DeleteAgendaService);

    const agenda = await deleteAgenda.execute(String(id), userId);

    return res.json(classToClass(agenda));
  }

  public async followers(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const agendaFollowers = container.resolve(ShowAgendaFollowersService);

    const followers = await agendaFollowers.execute(id);

    return res.json(classToClass(followers));
  }
}
