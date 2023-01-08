import React, { Component } from 'react';
import { Button, TextField, Paper, Stack } from '@mui/material';
import { Image } from 'mui-image';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import icon from '../style/icon.png';
import CustomBox from '../style/FormStyle';
import { fetchWithThunk, getEmail } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyBtn());
  };

  verifyBtn = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length >= minLength;
    this.setState({ isBtnDisabled: !(verifyEmail && verifyPassword) });
  };

  handleBtn = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
    dispatch(fetchWithThunk());
    history.push('/carteira');
  };

  render() {
    const { email, password, isBtnDisabled } = this.state;
    return (
      <CustomBox>
        <Stack spacing={ 3 }>
          <Paper elevation={ 0 }>
            <Image src={ icon } />
          </Paper>
          <TextField
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            fullWidth
          />
          <TextField
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            fullWidth
          />
          <Button
            data-testid="btn"
            type="submit"
            name="btn"
            disabled={ isBtnDisabled }
            onClick={ this.handleBtn }
            variant="contained"
            fullWidth
          >
            Sign In
          </Button>
        </Stack>
      </CustomBox>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect()(Login);
