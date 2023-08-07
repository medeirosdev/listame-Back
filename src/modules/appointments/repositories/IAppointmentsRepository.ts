import { DeleteResult } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IListProfileAppointmentsDTO from '../dtos/IListProfileAppointmentsDTO';

interface DataToDelete {
  agendaIds: string[];
  appointmentId: string;
  reccurrenceId?: string;
}

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByParams(data: IListProfileAppointmentsDTO): Promise<Appointment[]>;
  findByAgendaAndId(agendaIds: string[], id: string): Promise<Appointment>;
  findById(id: string): Promise<Appointment | undefined>;
  findByAgendaId(agendaId: string): Promise<Appointment[]>;
  delete(data: DataToDelete): Promise<DeleteResult>;
  save(appointment: Appointment): Promise<Appointment>;
}
