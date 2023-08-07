// import { format, parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IListProfileAppointmentsDTO from '../dtos/IListProfileAppointmentsDTO';

@injectable()
class UpdateProfileAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute({
    userId,
    id,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    status,
    notifyBefore,
    location,
    isPrivate,
  }: IListProfileAppointmentsDTO): Promise<Appointment> {
    const userAgenda = await this.usersAgendasRepository.findByUserId(userId);

    if (!userAgenda) {
      throw new AppError('Agenda not found');
    }

    const agendaIds: string[] = userAgenda.map(item => item.agenda_id);

    const appointment = await this.appointmentsRepository.findByAgendaAndId(
      agendaIds,
      id,
    );

    if (!appointment) {
      throw new AppError('Appointment not found');
    }

    if (startDate) appointment.start_date = startDate;
    if (endDate) appointment.end_date = endDate;
    if (appointmentName) appointment.appointment_name = appointmentName;
    if (appointmentDescription)
      appointment.appointment_description = appointmentDescription;
    if (status) appointment.status = status;
    if (notifyBefore) appointment.notify_before = notifyBefore;
    if (location) appointment.location = location;
    if (isPrivate) appointment.is_private = isPrivate;

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default UpdateProfileAppointmentsService;
