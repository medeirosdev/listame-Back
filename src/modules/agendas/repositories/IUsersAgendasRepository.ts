import { DeleteResult } from 'typeorm';
import IDeleteUserAgendaDTO from '@modules/agendas/dtos/IDeleteUserAgendaDTO';
import IFindUserAgendaDTO from '@modules/agendas/dtos/IFindUserAgendaDTO';
import UserAgenda from '../infra/typeorm/entities/UserAgenda';
import ICreateUserAgendaDTO from '../dtos/ICreateUserAgendaDTO';

export default interface IUsersAgendasRepository {
  find(data: IFindUserAgendaDTO): Promise<UserAgenda | undefined>;
  findById(id: string): Promise<UserAgenda | undefined>;
  findByUserId(id: string): Promise<UserAgenda[] | undefined>;
  findByAgendaId(id: string): Promise<UserAgenda[] | undefined>;
  create(data: ICreateUserAgendaDTO): Promise<UserAgenda>;
  save(agenda: UserAgenda): Promise<UserAgenda>;
  delete(data: IDeleteUserAgendaDTO): Promise<DeleteResult>;
}
