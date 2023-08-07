import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);
sessionsRouter.post('/valid', sessionsController.isValid);
sessionsRouter.post('/google', sessionsController.createGoogle);
sessionsRouter.post('/facebook', sessionsController.createFacebook);

export default sessionsRouter;
