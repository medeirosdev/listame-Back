import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { isSameDay } from 'date-fns';

interface GroupedAppointment {
  date: string | Date;
  appointments: Appointment[];
}

export const groupByDate = (appointments: Appointment[]) => {
  const response: GroupedAppointment[] = [];
  appointments.forEach(appointment => {
    // const date = format(appointment.start_date, 'dd/MM/yyyy');
    if (response.length === 0) {
      response.push({
        date: appointment.start_date,
        appointments: [appointment],
      });
    } else {
      const ind = response.findIndex(item => {
        return isSameDay(new Date(item.date), new Date(appointment.start_date));
      });
      if (ind < 0) {
        response.push({
          date: appointment.start_date,
          appointments: [appointment],
        });
      } else {
        response[ind].appointments.push(appointment);
      }
    }
  });
  return response.sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });
};
