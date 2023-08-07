import { DeleteResult, getRepository, In, Repository } from 'typeorm';

import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import ICreateUserAgendaDTO from '@modules/agendas/dtos/ICreateUserAgendaDTO';
import UserAgenda from '@modules/agendas/infra/typeorm/entities/UserAgenda';
import IDeleteUserAgendaDTO from '@modules/agendas/dtos/IDeleteUserAgendaDTO';
import IFindUserAgendaDTO from '@modules/agendas/dtos/IFindUserAgendaDTO';
import { UserAgendaRole } from '@modules/agendas/infra/typeorm/enums/UserAgendaRoles';

class UsersAgendasRepository implements IUsersAgendasRepository {
  private ormRepository: Repository<UserAgenda>;

  constructor() {
    this.ormRepository = getRepository(UserAgenda);
  }

  public async delete(data: IDeleteUserAgendaDTO): Promise<DeleteResult> {
    const where = {
      agenda_id: data.agendaId,
      user_id: data.userId,
    };

    const agendaUsersDeleted = await this.ormRepository.delete(where);

    return agendaUsersDeleted;
  }

  public async find(data: IFindUserAgendaDTO): Promise<UserAgenda | undefined> {
    const agenda = await this.ormRepository.findOne({
      where: {
        agenda_id: data.agendaId,
        user_id: data.userId,
      },
    });

    return agenda;
  }

  public async findById(id: string): Promise<UserAgenda | undefined> {
    const agenda = await this.ormRepository.findOne(id);

    return agenda;
  }

  public async findByUserId(id: string): Promise<UserAgenda[] | undefined> {
    const agenda = await this.ormRepository.find({
      where: {
        user_id: id,
      },
    });

    return agenda;
  }

  public async findByAgendaId(id: string): Promise<UserAgenda[] | undefined> {
    const agenda = await this.ormRepository.find({
      where: {
        agenda_id: id,
      },
    });

    return agenda;
  }

  public async create({
    userId,
    agendaId,
    role = UserAgendaRole.OWNER,
  }: ICreateUserAgendaDTO): Promise<UserAgenda> {
    const userAgenda = this.ormRepository.create({
      user_id: userId,
      agenda_id: agendaId,
      role,
    });

    await this.ormRepository.save(userAgenda);

    return userAgenda;
  }

  public async save(userAgenda: UserAgenda): Promise<UserAgenda> {
    return this.ormRepository.save(userAgenda);
  }
}

export default UsersAgendasRepository;
