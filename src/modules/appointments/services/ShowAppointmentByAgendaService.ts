// import { format, parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class ShowAppointmentByAgendaService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(agendaId: string): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findByAgendaId(
      agendaId,
    );

    if (!appointments) {
      throw new AppError('Appointments not found');
    }

    return appointments;
  }
}

export default ShowAppointmentByAgendaService;
