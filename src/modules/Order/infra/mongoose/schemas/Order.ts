import mongoose from 'mongoose';

import IOrderDTO from '../../../dtos/IOrderDTO';

if (process.env.NODE_ENV !== 'test') {
  const str_connect = process.env.DB_STR_CONNECT;
  mongoose.Promise = global.Promise;

  mongoose
    .connect(`${str_connect}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(function () {
      console.log('Mongo on...');
    })
    .catch(function (err) {
      console.log(`Houve um erro ao se conectar ao MongoDB: ${err}`);
    });
}

const Orders = new mongoose.Schema(
  {
    id_order: { type: String, required: true, unique: true },
    client: {
      company: { type: String, required: true },
      contact_person: { type: String, required: true },
    },
    detail: {
      code: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      currency: { type: String, required: true },
      total_value: { type: Number, required: true },
      formatted_weighted_value: { type: String, required: true },
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model<IOrderDTO>('Orders', Orders);
