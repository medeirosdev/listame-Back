import { parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    agendaId,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    notifyBefore,
    recurrence,
    status,
    location,
    isPrivate,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const parsedStartDate = parseISO(String(startDate));
    const parsedEndDate = endDate ? parseISO(String(endDate)) : null;

    const data = {
      agendaId,
      startDate: parsedStartDate,
      endDate,
      appointmentName,
      appointmentDescription,
      notifyBefore,
      recurrence,
      status,
      location,
      isPrivate,
    };

    if (parsedEndDate) {
      data.endDate = parsedEndDate;
    }

    const appointment = await this.appointmentsRepository.create(data);

    return appointment;
  }
}

export default CreateAppointmentService;
