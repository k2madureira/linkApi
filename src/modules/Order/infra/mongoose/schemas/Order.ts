import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose
  .connect(
    'mongodb+srv://linkApi:linkApi@cluster0.faphu.mongodb.net/linkDB?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  )
  .then(function () {
    console.log('Mongo on...');
  })
  .catch(function (err) {
    console.log(`Houve um erro ao se conectar ao MongoDB: ${err}`);
  });

const Orders = new mongoose.Schema(
  {
    id_order: { type: String, required: true, unique: true },
    customer: {
      company: { type: String, required: true },
      contact_person: { type: String, required: true },
    },
    item: {
      code: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      currency: { type: String, required: true },
      total_value: { type: Number, required: true },
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('Orders', Orders);
