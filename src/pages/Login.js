import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/context';

function Login() {
  const { setData } = useContext(context);
  const [user, setUser] = useState({ email: '', password: '' });
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
    setData((prevState) => ({ ...prevState, user: { email } }));
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

export default Login;
