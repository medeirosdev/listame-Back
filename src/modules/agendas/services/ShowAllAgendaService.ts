/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IAgendasRepository from '../repositories/IAgendasRepository';

@injectable()
class ShowAllAgendaService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,
  ) {}

  public async execute(): Promise<Agenda[]> {
    const agendas = await this.agendasRepository.findAll();

    return agendas;
  }
}

export default ShowAllAgendaService;
