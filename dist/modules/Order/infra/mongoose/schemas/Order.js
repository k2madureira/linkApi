"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'test') {
  const str_connect = process.env.DB_STR_CONNECT;
  _mongoose.default.Promise = global.Promise;

  _mongoose.default.connect(`${str_connect}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(function () {
    console.log('Mongo on...');
  }).catch(function (err) {
    console.log(`Houve um erro ao se conectar ao MongoDB: ${err}`);
  });
}

const Orders = new _mongoose.default.Schema({
  id_order: {
    type: String,
    required: true,
    unique: true
  },
  client: {
    company: {
      type: String,
      required: true
    },
    contact_person: {
      type: String,
      required: true
    }
  },
  detail: {
    code: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    total_value: {
      type: Number,
      required: true
    },
    formatted_weighted_value: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var _default = _mongoose.default.model('Orders', Orders);

exports.default = _default;