/* eslint-disable prettier/prettier */
import { injectable, inject } from 'tsyringe';

import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import { UserAgendaRole } from '@modules/agendas/infra/typeorm/enums/UserAgendaRoles';
import IAgendasRepository from '../repositories/IAgendasRepository';
import IUsersAgendasRepository from '../repositories/IUsersAgendasRepository';
import ICreateAgendaDTO from '../dtos/ICreateAgendaDTO';

@injectable()
class CreateAgendaService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,

    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute({
    name,
    description,
    isPrivate,
    createdBy,
  }: ICreateAgendaDTO): Promise<Agenda> {
    const agenda = await this.agendasRepository.create({
      name,
      description,
      isPrivate,
      createdBy,
    });

    const savedAgenda = await this.agendasRepository.save(agenda);

    if (!savedAgenda) {
      throw new Error('Error creating agenda');
    }

    const userAgenda = await this.usersAgendasRepository.create({
      userId: createdBy,
      agendaId: savedAgenda.id,
      role: UserAgendaRole.OWNER,
    });

    if (!userAgenda) {
      throw new Error('Error creating agenda');
    }

    return agenda;
  }
}

export default CreateAgendaService;
