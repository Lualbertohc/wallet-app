import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  Button,
  Box,
} from '@mui/material';
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
    <Box sx={ { display: 'flex', flexWrap: 'wrap' } }>
      <TextField
        onChange={ handleChange }
        label="Valor"
        id="value"
        type="number"
        name="value"
        size="small"
        sx={ { m: 1, width: '35ch' } }
      />
      <TextField
        onChange={ handleChange }
        label="Descrição"
        id="description"
        type="text"
        name="description"
        size="small"
        sx={ { m: 1, width: '43ch' } }
      />
      <FormControl size="small" sx={ { m: 1, width: '35ch' } }>
        <Select
          name="currency"
          onChange={ handleChange }
          displayEmpty
        >
          {currencies.map((coin) => <option key={ coin }>{coin}</option>)}
        </Select>
      </FormControl>
      <FormControl size="small" sx={ { m: 1, width: '35ch' } }>
        <Select
          onChange={ handleChange }
          name="method"
          displayEmpty
        >
          <MenuItem>Cartão de crédito</MenuItem>
          <MenuItem>Cartão de débito</MenuItem>
          <MenuItem>Dinheiro</MenuItem>
          <MenuItem>PIX</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={ { m: 1, width: '35ch' } }>
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
      </FormControl>
      <Button
        onClick={ handleBtn }
        type="submit"
        variant="contained"
        sx={ { m: 1, width: '25ch' } }
      >
        Adicionar despesa
      </Button>
    </Box>
  );
}

export default WalletForm;
