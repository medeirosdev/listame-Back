// import { format, parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IDeleteProfileAppointmentsRequestDTO from '../dtos/IDeleteProfileAppointmentsRequestDTO';

@injectable()
class DeleteProfileAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute({
    userId,
    appointmentId,
    reccurrenceId,
  }: IDeleteProfileAppointmentsRequestDTO): Promise<DeleteResult> {
    const userAgenda = await this.usersAgendasRepository.findByUserId(userId);

    if (!userAgenda) {
      throw new AppError('Not Authorized', 401);
    }

    const agendaIds: string[] = userAgenda.map(item => item.agenda_id);

    const data = {
      agendaIds,
      appointmentId,
      reccurrenceId,
    };

    const deletedResult = await this.appointmentsRepository.delete(data);

    return deletedResult;
  }
}

export default DeleteProfileAppointmentsService;
