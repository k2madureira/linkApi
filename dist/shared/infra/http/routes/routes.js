"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _order = _interopRequireDefault(require("../../../../modules/Order/infra/http/routes/order.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.get('/', (request, response) => {
  return response.json({
    routes: {
      order: {
        list: {
          path: '/order/all',
          type: 'get'
        },
        create: {
          path: '/order',
          type: 'post'
        }
      }
    }
  });
});
routes.use('/order', _order.default);
var _default = routes;
exports.default = _default;