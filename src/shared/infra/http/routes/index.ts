/* eslint-disable prettier/prettier */
import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';
import agendasRouter from '@modules/agendas/infra/http/routes/agendas.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profiles', profilesRouter);
routes.use('/agendas', agendasRouter);

export default routes;
