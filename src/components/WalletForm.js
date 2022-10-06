import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWalletForm } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleBtn = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag } = this.state;
    dispatch(getWalletForm({
      id,
      value,
      description,
      currency,
      method,
      tag,
    }));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  render() {
    const { coins } = this.props;
    const { value, description } = this.state;
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
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição da despesa
            <input
              data-testid="description-input"
              id="description"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {coins?.map((coin) => <option key={ coin }>{ coin }</option>)}
          </select>
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="submit"
            onClick={ this.handleBtn }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

WalletForm.propTypes = {
  coins: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
