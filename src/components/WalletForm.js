import { Select, MenuItem } from '@mui/material';
import React, { useState, useContext } from 'react';
import context from '../context/context';
import { BoxWalletForm,
  IputWalletForm, WalletFormControl,
  WalletFormButton } from '../styles/WalletFromStyle';

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
    <BoxWalletForm>
      <IputWalletForm
        onChange={ handleChange }
        id="value"
        type="number"
        name="value"
      />
      <IputWalletForm
        onChange={ handleChange }
        id="description"
        type="text"
        name="description"
      />
      <WalletFormControl onChange={ handleChange }>
        <Select
          name="currency"
          onChange={ handleChange }
          displayEmpty
        >
          {currencies.map((coin) => <option key={ coin }>{coin}</option>)}
        </Select>
      </WalletFormControl>
      <WalletFormControl>
        <Select
          onChange={ handleChange }
          name="method"
          displayEmpty
        >
          <MenuItem>Cartão de crédito</MenuItem>
          <MenuItem>Cartão de débito</MenuItem>
          <MenuItem>Dinheiro</MenuItem>
        </Select>
      </WalletFormControl>
      <WalletFormControl>
        <Select
          onChange={ handleChange }
          name="tag"
          displayEmpty
        >
          <MenuItem>Lazer</MenuItem>
          <MenuItem>Trabalho</MenuItem>
          <MenuItem>Transporte</MenuItem>
          <MenuItem>Saúde</MenuItem>
          <MenuItem>Alimentação</MenuItem>
        </Select>
      </WalletFormControl>
      <WalletFormButton
        onClick={ handleBtn }
        type="submit"
        variant="contained"
      >
        Adicionar despesa
      </WalletFormButton>
    </BoxWalletForm>
  );
}

export default WalletForm;
