/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import { UserAgendaRole } from '@modules/agendas/infra/typeorm/enums/UserAgendaRoles';

interface Request {
  userId: string;
  agendaId: string;
}

@injectable()
class ShowUserAgendaRoleService {
  constructor(
    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute(data: Request): Promise<UserAgendaRole | undefined> {
    const usersAgenda = await this.usersAgendasRepository.find(data);
    return usersAgenda?.role;
  }
}

export default ShowUserAgendaRoleService;
