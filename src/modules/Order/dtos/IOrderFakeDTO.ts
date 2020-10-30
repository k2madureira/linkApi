export default interface IOrderDTO {
  id_order: string;
  client: {
    company: string;
    contact_person: string;
  };
  detail: {
    code: number;
    description: string;
    currency: string;
    total_value: number;
    formatted_weighted_value: string;
  };

  created_at?: string;
}
