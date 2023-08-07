/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IAgendasRepository from '../repositories/IAgendasRepository';
import IUsersAgendasRepository from '../repositories/IUsersAgendasRepository';

@injectable()
class ShowAgendaProfileService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,

    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute(id: string): Promise<Agenda[]> {
    const userAgenda = await this.usersAgendasRepository.findByUserId(id);

    if (!userAgenda) {
      throw new AppError('Agenda not found');
    }

    const agendaIds: string[] = userAgenda.map(item => item.agenda_id);

    const agendas = await this.agendasRepository.findByIds(agendaIds);

    return agendas;
  }
}

export default ShowAgendaProfileService;
