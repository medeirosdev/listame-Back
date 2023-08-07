import { UserAgendaRole } from '@modules/agendas/infra/typeorm/enums/UserAgendaRoles';
import EnsureUserRoleService from '@modules/users/services/EnsureUserRoleService';
import { NextFunction, Request, Response } from 'express';
import { container, injectable } from 'tsyringe';

injectable();
class UserRoleMiddleware {
  public async valid(
    req: Request,
    _res: Response,
    next: NextFunction,
    roles: UserAgendaRole[],
  ): Promise<void> {
    const { id: agendaId } = req.params;
    const { id: userId } = req.user;
    const ensureUserRole = container.resolve(EnsureUserRoleService);
    // await ensureUserRole.execute({
    //   agendaId,
    //   userId,
    //   roles,
    // });
    next();
  }
}

export default UserRoleMiddleware;
