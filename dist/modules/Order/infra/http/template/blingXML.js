"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable @typescript-eslint/explicit-function-return-type */
function xml({
  name,
  code,
  title,
  unitValue,
  person_name
}) {
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

var _default = xml;
exports.default = _default;