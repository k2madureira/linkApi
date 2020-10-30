import { Request, Response } from 'express';
import { DealsController } from 'pipedrive';
import { format, parseISO } from 'date-fns';

import xmlTemplate from '../template/blingXML';
import blingAPI from '../../services/blingAPI';
import Order from '../../mongoose/schemas/Order';

import IOrderDTO from '../../../dtos/orderDTO';

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
}

export default class OrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const findAll = await Order.find();
      if (!findAll) {
        return response
          .status(400)
          .json({ msg: 'The list of orders is empty!!' });
      }

      const orders = findAll.map(order => {
        return {
          id_order: order.detail.code,
          company: order.company,
          contact_person: order.contact_person,
          detail: order.detail,
          created_at: format(new Date(order.created_at), 'yyyy-MM-dd'),
        };
      });

      return response.json(orders);
    } catch (error) {
      return response.json(error);
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { status = 'won' } = request.body;
      const Deal = await DealsController.getAllDeals(status);

      const promises = Deal.data.map(async (deal: IDeal) => {
        const order = {
          name: deal.owner_name,
          person_name: deal.person_name,
          code: deal.id,
          title: deal.title,
          unitValue: deal.value,
          currency: deal.currency,
          formatedValue: deal.formatted_weighted_value,
          addDate: format(parseISO(deal.add_time), 'yyyy-MM-dd'),
        };

        const xml = xmlTemplate(order);

        await blingAPI.post(
          `/pedido/json/?apikey=${process.env.BLING_API_KEY}&xml=${xml}`,
        );
        const findOrder = await Order.findOne({ id_order: deal.id });

        if (!findOrder) {
          await Order.create({
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
      });
      const responseDeals = await Promise.all(promises);

      return response.json({ Deals: responseDeals });
    } catch (error) {
      return response.json(error);
    }
  }
}
