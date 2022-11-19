import React, { useContext } from 'react';
import context from '../context/context';

function Table() {
  const { data } = useContext(context);
  const { wallet: { expenses } } = data;

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses !== undefined && expenses.map((info) => (
            <tr key={ info.id }>
              <td>{ info.description }</td>
              <td>{ info.tag }</td>
              <td>{ info.method }</td>
              <td>{ Number(info.value).toFixed(2) }</td>
              <td>{ info.currency }</td>
              <td>{ Number(info.exchangeRates[info.currency].ask).toFixed(2) }</td>
              <td>
                {
                  Number(info.value * info.exchangeRates[info.currency].ask).toFixed(2)
                }
              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
