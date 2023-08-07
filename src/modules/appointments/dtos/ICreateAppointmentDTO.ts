export default interface ICreateAppointmentDTO {
  agendaId: string;
  startDate: Date;
  endDate?: Date;
  appointmentName: string;
  appointmentDescription?: string;
  notifyBefore?: number;
  recurrence?: string;
  status: string;
  location?: string;
  isPrivate: boolean;
}
