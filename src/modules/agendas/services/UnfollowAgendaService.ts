/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import { DeleteResult } from 'typeorm';

interface Request {
  userId: string;
  agendaId: string;
}

@injectable()
class UnfollowAgendaService {
  constructor(
    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute(data: Request): Promise<DeleteResult> {
    return this.usersAgendasRepository.delete(data);
  }
}

export default UnfollowAgendaService;
