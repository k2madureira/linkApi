import IOrderDTO from '../dtos/orderFakeDTO';

export default interface IOrderRepository {
  findOne(): Promise<IOrderDTO[]>;
  create(data: IOrderDTO): Promise<IOrderDTO>;
}
