import { uuid } from 'uuidv4';
import IOrderRepository from '../repositories/IOrderRepository';

import IOrderDTO from '../dtos/IOrderFakeDTO';

export default class Order implements IOrderRepository {
  order: Array<IOrderDTO> = [];

  path: string;

  constructor() {
    this.order = [
      {
        id_order: '_ORDER_',
        client: {
          company: 'TEST',
          contact_person: 'TEST',
        },
        detail: {
          code: 1,
          description: 'TEST',
          currency: 'TEST',
          total_value: 1,
          formatted_weighted_value: 'TEST',
        },

        created_at: 'TEST',
      },
    ];
  }

  public async findOne(): Promise<IOrderDTO[]> {
    return this.order.sort((a, b) => {
      return a.id_order < b.id_order ? 1 : -1;
    });
  }

  public async create({
    client,
    detail,
    created_at,
  }: IOrderDTO): Promise<IOrderDTO> {
    const order = {
      id_order: uuid(),
      client: {
        company: client.company,
        contact_person: client.contact_person,
      },
      detail: {
        code: detail.code,
        currency: detail.currency,
        description: detail.currency,
        formatted_weighted_value: detail.formatted_weighted_value,
        total_value: detail.total_value,
      },
      created_at: created_at || '',
    };

    this.order.push(order);

    return order;
  }
}
