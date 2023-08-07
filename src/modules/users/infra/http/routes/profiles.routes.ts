import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProfilesController from '../controllers/ProfilesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfilesAvatarController from '../controllers/ProfilesAvatarController';

const profilesRouter = Router();
const upload = multer(uploadConfig);
const profilesController = new ProfilesController();
const profilesAvatarController = new ProfilesAvatarController();

profilesRouter.use(ensureAuthenticated);

profilesRouter.patch(
  '/avatar',
  upload.single('avatar'),
  profilesAvatarController.update,
);

profilesRouter.delete('/avatar', profilesAvatarController.delete);

profilesRouter.put('/', profilesController.update);

profilesRouter.get('/', profilesController.show);

export default profilesRouter;
