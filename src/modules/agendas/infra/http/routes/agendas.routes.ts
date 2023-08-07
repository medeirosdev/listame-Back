/* eslint-disable prettier/prettier */
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import { UserAgendaRole } from '@modules/agendas/infra/typeorm/enums/UserAgendaRoles';
import UserRoleMiddleware from '../../../../users/infra/http/middlewares/UserRoleMiddlewares';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import AgendasController from '../controllers/AgendasController';
import AgendasAvatarController from '../controllers/AgendasAvatarController';

const upload = multer(uploadConfig);
const agendasRouter = Router();
const agendasController = new AgendasController();
const agendasAvatarController = new AgendasAvatarController();
const userRoleMiddleware = new UserRoleMiddleware();

agendasRouter.use(ensureAuthenticated);

agendasRouter.post('/', agendasController.create);
agendasRouter.get('/', agendasController.index);
agendasRouter.get('/profile', agendasController.indexProfile);
agendasRouter.post(
  '/follow/:id',
  (req, res, next) =>
    userRoleMiddleware.valid(req, res, next, [
      UserAgendaRole.ADMIN,
      UserAgendaRole.FOLLOWER,
      UserAgendaRole.MAINTAINER,
    ]),
  agendasController.follow,
);
agendasRouter.delete(
  '/unfollow/:id',
  (req, res, next) =>
    userRoleMiddleware.valid(req, res, next, [
      UserAgendaRole.ADMIN,
      UserAgendaRole.FOLLOWER,
      UserAgendaRole.MAINTAINER,
    ]),
  agendasController.unfollow,
);
agendasRouter.get('/followers/:id', agendasController.followers);
agendasRouter.get('/:id', agendasController.show);
agendasRouter.get('/role/:id', agendasController.showRole);
agendasRouter.post('/filter', agendasController.filter);
agendasRouter.put('/:id', agendasController.update);
agendasRouter.delete(
  '/',
  (req, res, next) =>
    userRoleMiddleware.valid(req, res, next, [
      UserAgendaRole.OWNER,
      UserAgendaRole.MAINTAINER,
    ]),
  agendasController.delete,
);

agendasRouter.delete('/avatar/:id', agendasAvatarController.delete);

agendasRouter.patch(
  '/avatar/:id',
  upload.single('avatar'),
  agendasAvatarController.update,
);

export default agendasRouter;
