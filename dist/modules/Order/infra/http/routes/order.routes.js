"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _OrderController = _interopRequireDefault(require("../controllers/OrderController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRouter = (0, _express.Router)();
const orderController = new _OrderController.default();
orderRouter.post('/', orderController.create);
orderRouter.get('/all', orderController.index);
var _default = orderRouter;
exports.default = _default;