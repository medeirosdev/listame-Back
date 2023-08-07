/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import UserAgenda from '@modules/agendas/infra/typeorm/entities/UserAgenda';
import { UserAgendaRole } from '@modules/agendas/infra/typeorm/enums/UserAgendaRoles';

interface Request {
  userId: string;
  agendaId: string;
}

@injectable()
class FollowAgendaService {
  constructor(
    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute(data: Request): Promise<UserAgenda> {
    return this.usersAgendasRepository.create({
      ...data,
      role: UserAgendaRole.FOLLOWER,
    });
  }
}

export default FollowAgendaService;
