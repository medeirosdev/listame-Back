/* eslint-disable prettier/prettier */
import { DeleteResult } from 'typeorm';
import Agenda from '../infra/typeorm/entities/Agenda';
import ICreateAgendaDTO from '../dtos/ICreateAgendaDTO';

export default interface IAgendasRepository {
  findByIds(id: string[]): Promise<Agenda[]>;
  findById(id: string): Promise<Agenda | undefined>;
  deleteById(id: string): Promise<DeleteResult>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  findAll(options?: object): Promise<Agenda[]>;
  findByName(name: string): Promise<Agenda[] | undefined>;
  create(data: ICreateAgendaDTO): Promise<Agenda>;
  save(agenda: Agenda): Promise<Agenda>;
}
