/* eslint-disable @typescript-eslint/explicit-function-return-type */
interface IXML {
  name: string;
  code: number;
  title: string;
  unitValue: number;
  person_name: string;
}

function xml({ name, code, title, unitValue, person_name }: IXML) {
  return `
  <?xml version="1.0" encoding="ISO-8859-1"?>
    <pedido>
      <vendedor>${name}</vendedor>
      <cliente>
          <nome>${person_name}</nome>
      </cliente>
      <transporte>
        <volume>
          <servico>Internet</servico>
        </volume>
      </transporte>
      <itens>
          <item>
              <codigo>${code}</codigo>
              <descricao>${title}</descricao>
              <qtde>1</qtde>
              <vlr_unit>${unitValue}</vlr_unit>
              <vlr>1</vlr>
              <un>1</un>
          </item>
      </itens>
    </pedido>
  `;
}

export default xml;
