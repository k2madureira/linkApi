import { Request, Response } from 'express';
import { DealsController } from 'pipedrive';
import { format, parseISO } from 'date-fns';

import xmlTemplate from '../template/blingXML';
import blingAPI from '../../services/blingAPI';

import OrderModel from '../../mongoose/schemas/Order';
import OrderFake from '../../../fakes/OrderFake';

const currencyLoad = process.env.NODE_ENV === 'test' ? 'test' : 'prod';

interface IDeal {
  owner_name: string;
  id: number;
  title: string;
  value: number;
  add_time: string;
  currency: string;
  weighted_value: string;
  formatted_weighted_value: string;
  org_name: string;
  person_name: string;
  status: string;
}

export default class OrderController {
  public async index(__: Request, response: Response): Promise<Response> {
    try {
      const orders = [];
      if (currencyLoad !== 'test') {
        const findAll = await OrderModel.find();
        if (!findAll) {
          return response
            .status(400)
            .json({ msg: 'The list of orders is empty!!' });
        }

        findAll.map(order => {
          const orderFormated = {
            id_order: order.detail.code,
            company: order.client.company,
            contact_person: order.client.contact_person,
            detail: order.detail,
            created_at: format(new Date(order.created_at || ''), 'yyyy-MM-dd'),
          };

          orders.push(orderFormated);
          return orderFormated;
        });
      } else {
        const order = new OrderFake();
        const ordersArr = await order.findOne();

        orders.push(ordersArr[0]);
      }

      return response.json({ Deals: orders });
    } catch (error) {
      return response.json(error);
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { status = 'won', id_order, client, detail } = request.body;

      const responseData = [];

      if (currencyLoad !== 'test' && status === 'won') {
        const Deal = await DealsController.getAllDeals(status);

        const promises = Deal.data.map(async (deal: IDeal) => {
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
              addDate: format(parseISO(deal.add_time), 'yyyy-MM-dd'),
            };

            const xml = xmlTemplate(order);

            await blingAPI.post(
              `/pedido/json/?apikey=${process.env.BLING_API_KEY}&xml=${xml}`,
            );
            const findOrder = await OrderModel.findOne({ id_order: deal.id });

            if (!findOrder) {
              await OrderModel.create({
                id_order: deal.id,
                client: {
                  company: deal.org_name,
                  contact_person: deal.person_name,
                },
                detail: {
                  code: order.code,
                  description: deal.title,
                  currency: deal.currency,
                  total_value: deal.weighted_value,
                  formatted_weighted_value: deal.formatted_weighted_value,
                },
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
            addDate: format(parseISO(deal.add_time), 'yyyy-MM-dd'),
          };
        });

        const responseDeals = await Promise.all(promises);

        responseData.push(responseDeals);
      } else {
        const orderTest = new OrderFake();

        const orderCreated = await orderTest.create({
          id_order,
          client: {
            company: client.company,
            contact_person: client.contact_person,
          },
          detail: {
            code: detail.code,
            currency: detail.currency,
            description: detail.description,
            formatted_weighted_value: detail.formatted_weighted_value,
            total_value: detail.total_value,
          },
        });

        responseData.push(orderCreated);
      }

      return response.json({ Deals: responseData });
    } catch (error) {
      return response.json(error);
    }
  }
}
