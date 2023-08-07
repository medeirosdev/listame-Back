/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import UserAgenda from '@modules/agendas/infra/typeorm/entities/UserAgenda';
import { UserAgendaRole } from '@modules/agendas/infra/typeorm/enums/UserAgendaRoles';

@injectable()
class ShowAgendaFollowersService {
  constructor(
    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute(agendaId: string): Promise<UserAgenda[] | undefined> {
    const agendaUsers = await this.usersAgendasRepository.findByAgendaId(
      agendaId,
    );
    const followers = agendaUsers?.filter(
      agendaUser => agendaUser.role === UserAgendaRole.FOLLOWER,
    );
    return followers;
  }
}

export default ShowAgendaFollowersService;
