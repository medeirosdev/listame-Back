export default interface IListProfileAppointmentsDTO {
  userId: string;
  agendaIds?: string[];
  startDate?: Date;
  endDate?: Date;
  appointmentName?: string;
  appointmentDescription?: string;
  status?: string;
  location?: string;
  isPrivate?: boolean;
}
