"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../../../shared/infra/http/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('\n\n ===== Order ====== \n', () => {
  it('Should be able create  a new Order', async () => {
    const order = await (0, _supertest.default)(_app.default).post('/order').send({
      id_order: '_ORDER_2',
      client: {
        company: 'TEST',
        contact_person: 'TEST'
      },
      detail: {
        code: 2,
        description: 'TEST',
        currency: 'TEST',
        total_value: 1,
        formatted_weighted_value: 'TEST'
      },
      created_at: 'TEST'
    });
    expect(order.body).toHaveProperty('Deals');
  });
  it('Should be able list all Order', async () => {
    const order = await (0, _supertest.default)(_app.default).get('/order/all');
    expect(order.body).toEqual([{
      id_order: '_ORDER_',
      client: {
        company: 'TEST',
        contact_person: 'TEST'
      },
      detail: {
        code: 1,
        description: 'TEST',
        currency: 'TEST',
        total_value: 1,
        formatted_weighted_value: 'TEST'
      },
      created_at: 'TEST'
    }]);
  });
});