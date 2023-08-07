import { UserAgendaRole } from '@modules/agendas/infra/typeorm/enums/UserAgendaRoles';

export default interface ICreateUserAgendaDTO {
  userId: string;
  agendaId: string;
  role?: UserAgendaRole;
}
