import { Router, Request, Response } from 'express';

import orderRouter from '@modules/Order/infra/http/routes/order.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({
    routes: {
      order: {
        list: {
          path: '/order/all',
          type: 'get',
        },
        create: {
          path: '/order',
          type: 'post',
        },
      },
    },
  });
});
routes.use('/order', orderRouter);

export default routes;
