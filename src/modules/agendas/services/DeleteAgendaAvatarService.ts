/* eslint-disable camelcase */
import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IAgendasRepository from '@modules/agendas/repositories/IAgendasRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

@injectable()
class DeleteAgendaAvatarService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,
  ) {}

  public async execute(id: string): Promise<Agenda> {
    const agenda = await this.agendasRepository.findById(id);
    if (!agenda) throw new AppError('Agenda not found', 404);

    agenda.avatar = '';
    return this.agendasRepository.save(agenda);
  }
}

export default DeleteAgendaAvatarService;
