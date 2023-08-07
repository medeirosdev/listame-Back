/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IAgendasRepository from '../repositories/IAgendasRepository';

@injectable()
class ShowAgendasFilterService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,
  ) {}

  public async execute(agendasIds: Agenda['id'][]): Promise<Agenda[]> {
    const agendas = await this.agendasRepository.findByIds(agendasIds);

    return agendas;
  }
}

export default ShowAgendasFilterService;
