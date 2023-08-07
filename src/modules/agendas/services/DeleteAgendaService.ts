/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import IAgendasRepository from '../repositories/IAgendasRepository';

interface Request {
  id: string;
  name?: string;
  description?: string;
  isPrivate?: string;
}

@injectable()
class DeleteAgendaService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,
    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute(id: string, userId: string): Promise<DeleteResult> {
    await this.usersAgendasRepository.delete({
      agendaId: id,
      userId,
    });
    return this.agendasRepository.deleteById(id);
  }
}

export default DeleteAgendaService;
