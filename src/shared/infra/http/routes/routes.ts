import { Router } from 'express';

import orderRouter from '@modules/Order/infra/http/routes/order.routes';

const routes = Router();

routes.use('/order', orderRouter);

export default routes;
