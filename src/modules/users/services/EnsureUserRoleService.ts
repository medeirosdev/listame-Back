import { injectable, inject } from 'tsyringe';

import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import { UserAgendaRole } from '@modules/agendas/infra/typeorm/enums/UserAgendaRoles';
import AppError from '@shared/errors/AppError';
import { AppErrorCodeEnum } from '@shared/errors/AppErrorCodeEnum';

interface Request {
  userId: string;
  agendaId: string;
  roles: UserAgendaRole[];
}

@injectable()
class EnsureUserRoleService {
  constructor(
    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute(data: Request): Promise<void> {
    const { roles, userId, agendaId } = data;
    const userRole = await this.usersAgendasRepository.find({
      agendaId,
      userId,
    });
    if (!userRole?.role || !roles.includes(userRole?.role)) {
      throw new AppError(
        "This action can't be performed by this user 'role'",
        403,
        AppErrorCodeEnum.FORBIDDEN_BY_ROLE,
      );
    }
  }
}

export default EnsureUserRoleService;
