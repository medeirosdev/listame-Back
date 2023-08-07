/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IAgendasRepository from '../repositories/IAgendasRepository';

interface Request {
  id: string;
  name?: string;
  description?: string;
  isPrivate?: string;
}

@injectable()
class UpdateAgendaService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    isPrivate,
  }: Request): Promise<Agenda> {
    const agenda = await this.agendasRepository.findById(id);

    if (!agenda) {
      throw new AppError('Agenda not found');
    }

    if (name) {
      const nameExists = await this.agendasRepository.findByName(name);

      if (nameExists) {
        throw new AppError('Name already used');
      }
    }

    if (name) agenda.name = name;
    if (description) agenda.description = description;
    if (isPrivate) agenda.is_private = isPrivate;

    await this.agendasRepository.save(agenda);

    return agenda;
  }
}

export default UpdateAgendaService;
