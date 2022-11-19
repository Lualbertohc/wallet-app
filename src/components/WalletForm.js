import React, { useState, useContext } from 'react';
import context from '../context/context';

function WalletForm() {
  const { data, setData, exchangeRatesInfo } = useContext(context);
  const [walletForm, setWalletForm] = useState({
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: exchangeRatesInfo,
  });

  const { wallet: { currencies } } = data;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setWalletForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleBtn = (e) => {
    e.preventDefault();
    setData((prevState) => ({
      ...prevState,
      wallet: {
        currencies,
        expenses: [walletForm],
      },
    }));
    setWalletForm((prevState) => ([{
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }]));
  };

  return (
    <div>
      <form>
        <label htmlFor="value">
          Valor da despesa
          <input
            data-testid="value-input"
            id="value"
            type="number"
            name="value"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição da despesa
          <input
            data-testid="description-input"
            id="description"
            type="text"
            name="description"
            onChange={ handleChange }
          />
        </label>
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ handleChange }
        >
          {currencies.map((coin) => <option key={ coin }>{coin}</option>)}
        </select>
        <select
          name="method"
          data-testid="method-input"
          onChange={ handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          data-testid="btn-wallet"
          type="submit"
          onClick={ handleBtn }
        >
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}

export default WalletForm;
