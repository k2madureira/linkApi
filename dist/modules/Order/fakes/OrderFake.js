"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

class Order {
  constructor() {
    this.order = [];
    this.path = void 0;
    this.order = [{
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
    }];
  }

  async findOne() {
    return this.order.sort((a, b) => {
      return a.id_order < b.id_order ? 1 : -1;
    });
  }

  async create({
    client,
    detail,
    created_at
  }) {
    const order = {
      id_order: (0, _uuidv.uuid)(),
      client: {
        company: client.company,
        contact_person: client.contact_person
      },
      detail: {
        code: detail.code,
        currency: detail.currency,
        description: detail.currency,
        formatted_weighted_value: detail.formatted_weighted_value,
        total_value: detail.total_value
      },
      created_at: created_at || ''
    };
    this.order.push(order);
    return order;
  }

}

exports.default = Order;