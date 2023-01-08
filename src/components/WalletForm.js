import {
  MenuItem,
  TextField,
  Button,
  Box,
} from '@mui/material';
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
      <Box sx={ { display: 'flex', flexWrap: 'wrap' } }>
        <TextField
          label="Valor da despesa"
          id="value"
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
          size="small"
          sx={ { m: 1, width: '25ch' } }
        />
        <TextField
          label="Descrição"
          id="description"
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
          size="small"
          sx={ { m: 1, width: '80ch' } }
        />
        <TextField
          select
          label="Moeda"
          name="currency"
          onChange={ this.handleChange }
          size="small"
          sx={ { m: 1, width: '25ch' } }
        >
          {coins?.map((coin) => (
            <MenuItem key={ coin } value={ coin }>
              { coin }
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Método de pagamento"
          onChange={ this.handleChange }
          name="method"
          displayEmpty
          size="small"
          sx={ { m: 1, width: '25ch' } }
        >
          <MenuItem value="Cartão de crédito">Cartão de crédito</MenuItem>
          <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
          <MenuItem value="Dinheiro">Dinheiro</MenuItem>
        </TextField>
        <TextField
          select
          label="Tag"
          onChange={ this.handleChange }
          name="tag"
          displayEmpty
          size="small"
          sx={ { m: 1, width: '25ch' } }
        >
          <MenuItem value="Lazer">Lazer</MenuItem>
          <MenuItem value="Trabalho">Trabalho</MenuItem>
          <MenuItem value="Transporte">Transporte</MenuItem>
          <MenuItem value="Saúde">Saúde</MenuItem>
          <MenuItem value="Alimentação">Alimentação</MenuItem>
          <MenuItem value="Outros">Outros</MenuItem>
        </TextField>
        <Button
          onClick={ this.handleBtn }
          type="submit"
          variant="contained"
          sx={ { m: 1, width: '25ch' } }
        >
          Adicionar despesa
        </Button>
      </Box>
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
