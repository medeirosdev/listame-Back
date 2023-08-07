/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IAgendasRepository from '../repositories/IAgendasRepository';

@injectable()
class ShowAgendaService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,
  ) {}

  public async execute(agendaId: string): Promise<Agenda | undefined> {
    const agenda = await this.agendasRepository.findById(agendaId);
    return agenda;
  }
}

export default ShowAgendaService;
