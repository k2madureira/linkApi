"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pipedrive = require("pipedrive");

var _dateFns = require("date-fns");

var _blingXML = _interopRequireDefault(require("../template/blingXML"));

var _blingAPI = _interopRequireDefault(require("../../services/blingAPI"));

var _Order = _interopRequireDefault(require("../../mongoose/schemas/Order"));

var _OrderFake = _interopRequireDefault(require("../../../fakes/OrderFake"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const currencyLoad = process.env.NODE_ENV === 'test' ? 'test' : 'prod';

class OrderController {
  async index(__, response) {
    try {
      const orders = [];

      if (currencyLoad !== 'test') {
        const findAll = await _Order.default.find();

        if (!findAll) {
          return response.status(400).json({
            msg: 'The list of orders is empty!!'
          });
        }

        findAll.map(order => {
          const orderFormated = {
            id_order: order.detail.code,
            company: order.client.company,
            contact_person: order.client.contact_person,
            detail: order.detail,
            created_at: (0, _dateFns.format)(new Date(order.created_at || ''), 'yyyy-MM-dd')
          };
          orders.push(orderFormated);
          return orderFormated;
        });
      } else {
        const order = new _OrderFake.default();
        const ordersArr = await order.findOne();
        orders.push(ordersArr[0]);
      }

      return response.json(orders);
    } catch (error) {
      return response.json(error);
    }
  }

  async create(request, response) {
    try {
      const {
        status = 'won',
        id_order,
        client,
        detail
      } = request.body;
      const responseData = [];

      if (currencyLoad !== 'test' && status === 'won') {
        const Deal = await _pipedrive.DealsController.getAllDeals(status);
        const promises = Deal.data.map(async deal => {
          if (deal.status !== 'lost') {
            const order = {
              name: deal.owner_name,
              person_name: deal.person_name,
              code: deal.id,
              title: deal.title,
              unitValue: deal.value,
              currency: deal.currency,
              formatedValue: deal.formatted_weighted_value,
              status: deal.status,
              addDate: (0, _dateFns.format)((0, _dateFns.parseISO)(deal.add_time), 'yyyy-MM-dd')
            };
            const xml = (0, _blingXML.default)(order);
            await _blingAPI.default.post(`/pedido/json/?apikey=${process.env.BLING_API_KEY}&xml=${xml}`);
            const findOrder = await _Order.default.findOne({
              id_order: deal.id
            });

            if (!findOrder) {
              await _Order.default.create({
                id_order: deal.id,
                client: {
                  company: deal.org_name,
                  contact_person: deal.person_name
                },
                detail: {
                  code: order.code,
                  description: deal.title,
                  currency: deal.currency,
                  total_value: deal.weighted_value,
                  formatted_weighted_value: deal.formatted_weighted_value
                }
              });
            }

            return order;
          }

          return {
            person_name: deal.person_name,
            title: deal.title,
            unitValue: deal.value,
            formatedValue: deal.formatted_weighted_value,
            status: deal.status,
            addDate: (0, _dateFns.format)((0, _dateFns.parseISO)(deal.add_time), 'yyyy-MM-dd')
          };
        });
        const responseDeals = await Promise.all(promises);
        responseData.push(responseDeals);
      } else {
        const orderTest = new _OrderFake.default();
        const orderCreated = await orderTest.create({
          id_order,
          client: {
            company: client.company,
            contact_person: client.contact_person
          },
          detail: {
            code: detail.code,
            currency: detail.currency,
            description: detail.description,
            formatted_weighted_value: detail.formatted_weighted_value,
            total_value: detail.total_value
          }
        });
        responseData.push(orderCreated);
      }

      return response.json({
        Deals: responseData
      });
    } catch (error) {
      return response.json(error);
    }
  }

}

exports.default = OrderController;