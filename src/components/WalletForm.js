import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWalletForm } from '../redux/actions/index';

function WalletForm() {
  const [walletForm, setWalletForm] = useState({
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setWalletForm((prevState) => ({ ...prevState, [name]: value }));
  };

  handleBtn = (e) => {
    e.preventDefault();
    const { dispatch } = props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag } = walletForm;
    dispatch(getWalletForm({
      id,
      value,
      description,
      currency,
      method,
      tag,
    }));
    setWalletForm((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  const { coins } = props;

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
          {coins?.map((coin) => <option key={ coin }>{coin}</option>)}
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

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

WalletForm.propTypes = {
  coins: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
