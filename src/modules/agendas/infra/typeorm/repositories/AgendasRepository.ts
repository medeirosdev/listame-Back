import { getRepository, Repository, In, DeleteResult } from 'typeorm';

import IAgendasRepository from '@modules/agendas/repositories/IAgendasRepository';
import ICreateAgendaDTO from '@modules/agendas/dtos/ICreateAgendaDTO';
import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';

class AgendasRepository implements IAgendasRepository {
  private ormRepository: Repository<Agenda>;

  constructor() {
    this.ormRepository = getRepository(Agenda);
  }

  public async findByIds(ids: string[]): Promise<Agenda[]> {
    const agenda = await this.ormRepository.find({
      where: {
        id: In(ids),
      },
      relations: ['user'],
    });

    return agenda || [];
  }

  public async findById(id: string): Promise<Agenda | undefined> {
    const agenda = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    return agenda;
  }

  public async findByName(name: string): Promise<Agenda[] | undefined> {
    const agenda = await this.ormRepository.find({
      where: { name },
    });

    return agenda;
  }

  public async findAll(): Promise<Agenda[]> {
    const agenda = await this.ormRepository.find({
      relations: ['user'],
    });

    return agenda || [];
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete(id);
  }

  public async create({
    name,
    description,
    isPrivate,
    createdBy,
  }: ICreateAgendaDTO): Promise<Agenda> {
    const agenda = this.ormRepository.create({
      name,
      description,
      is_private: isPrivate,
      created_by: createdBy,
      members: 1,
    });

    await this.ormRepository.save(agenda);

    return agenda;
  }

  public async save(agenda: Agenda): Promise<Agenda> {
    return this.ormRepository.save(agenda);
  }
}

export default AgendasRepository;
