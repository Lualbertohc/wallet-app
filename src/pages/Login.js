import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWithThunk, getEmail } from '../redux/actions';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const verifyBtn = () => {
    const { email, password } = user;
    const passwordLength = 6;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length >= passwordLength;
    setIsDisabled(!(verifyEmail && verifyPassword));
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
    verifyBtn();
  };

  const handleBtn = (e) => {
    e.preventDefault();
    const { email } = user;
    dispatch(getEmail(email));
    dispatch(fetchWithThunk());
    history.push('/carteira');
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email:
          <input
            onChange={ handleChange }
            data-testid="email-input"
            id="email"
            type="text"
            name="email"
          />
        </label>
        <label htmlFor="email">
          Password:
          <input
            onChange={ handleChange }
            data-testid="password-input"
            id="password"
            type="password"
            name="password"
          />
        </label>
        <button
          onClick={ handleBtn }
          data-testid="btn"
          type="submit"
          name="btn"
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect()(Login);
