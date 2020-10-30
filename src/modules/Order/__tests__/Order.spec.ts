import request from 'supertest';
import app from '@shared/infra/http/app';

describe('\n\n ===== Order ====== \n', () => {
  it('Should be able create  a new Order', async () => {
    const order = await request(app)
      .post('/order')
      .send({
        id_order: '_ORDER_2',
        client: {
          company: 'TEST',
          contact_person: 'TEST',
        },
        detail: {
          code: 2,
          description: 'TEST',
          currency: 'TEST',
          total_value: 1,
          formatted_weighted_value: 'TEST',
        },

        created_at: 'TEST',
      });

    expect(order.body).toHaveProperty('Deals');
  });

  it('Should be able list all Order', async () => {
    const order = await request(app).get('/order/all');
    expect(order.body).toHaveProperty('Deals');
  });
});
