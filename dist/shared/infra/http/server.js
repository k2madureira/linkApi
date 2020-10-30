"use strict";

require("../bootstrap");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _pipedrive = _interopRequireDefault(require("pipedrive"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _routes = _interopRequireDefault(require("./routes/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_routes.default);
app.use((err, request, response, _) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
_pipedrive.default.Configuration.apiToken = `${process.env.PIPEDRIVE_API_KEY}`;
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`🚀 Server start on port ${port}`);
});
app.listen(1800);