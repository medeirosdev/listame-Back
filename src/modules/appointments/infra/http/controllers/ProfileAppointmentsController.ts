/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import ListProfileAppointmentsService from '@modules/appointments/services/ListProfileAppointmentsService';
import UpdateProfileAppointmentsService from '@modules/appointments/services/UpdateProfileAppointmentsService';
import DeleteProfileAppointmentsService from '@modules/appointments/services/DeleteProfileAppointmentsService';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IListProfileAppointmentsDTO from '@modules/appointments/dtos/IListProfileAppointmentsDTO';
import IDeleteProfileAppointmentsRequestDTO from '@modules/appointments/dtos/IDeleteProfileAppointmentsRequestDTO';
import { groupByDate } from '@modules/appointments/utils/groupByDate';
import { classToClass } from 'class-transformer';
import ShowAppointmentService from '@modules/appointments/services/ShowAppointmentService';

export default class ProfileAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const {
      agendaIds,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate,
    } = req.query;

    const data = {
      userId,
      agendaIds,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate,
    } as IListProfileAppointmentsDTO;

    const listProfileAppointmentsService = container.resolve(
      ListProfileAppointmentsService,
    );

    const appointments: Appointment[] = await listProfileAppointmentsService.execute(
      data,
    );

    return res.json(groupByDate(appointments));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.params;
    const {
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      notifyBefore,
      isPrivate,
    } = req.body;

    const data = {
      userId,
      id,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate,
      notifyBefore,
    } as IListProfileAppointmentsDTO;

    const updateProfileAppointmentsService = container.resolve(
      UpdateProfileAppointmentsService,
    );

    const appointment: Appointment = await updateProfileAppointmentsService.execute(
      data,
    );

    return res.json(appointment);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { appointmentId, reccurrenceId } = req.query;

    const data = {
      userId,
      appointmentId,
      reccurrenceId,
    } as IDeleteProfileAppointmentsRequestDTO;

    const deleteProfileAppointmentsService = container.resolve(
      DeleteProfileAppointmentsService,
    );

    const result: DeleteResult = await deleteProfileAppointmentsService.execute(
      data,
    );

    return res.json(result);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showAppointment = container.resolve(ShowAppointmentService);

    const agenda = await showAppointment.execute(id);

    return res.json(classToClass(agenda));
  }
}
