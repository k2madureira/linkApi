import { Request, Response } from 'express';
import { DealsController } from 'pipedrive';
import { format, parseISO } from 'date-fns';

import xmlTemplate from '../template/blingXML';
import blingAPI from '../../services/blingAPI';
import Order from '../../mongoose/schemas/Order';

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

        const r = await blingAPI.post(
          `/pedido/json/?apikey=${process.env.BLING_API_KEY}&xml=${xml}`,
        );

        console.log(deal);

        return order;

        /* await Order.create({
          id_order: deal.id,
          customer: {
            company: deal.org_name,
            contact_person: deal.person_name,
          },
          item: {
            code: order.code,
            description: deal.title,
            currency: deal.weighted_value_currency,
            total_value: deal.weighted_value,
          },
        }); */
      });
      const responseDeals = await Promise.all(promises);

      return response.json({ Deals: responseDeals });
    } catch (error) {
      return response.json(error);
    }
  }
}
