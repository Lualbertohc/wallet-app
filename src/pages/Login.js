import { Button, Stack, TextField, Paper } from '@mui/material';
import { Image } from 'mui-image';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import icon from '../styles/icon.png';
import context from '../context/context';
import CustomBox from '../styles/LoginStyle';

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
    <CustomBox>
      <Stack spacing={ 3 }>
        <Paper elevation={ 0 }>
          <Image src={ icon } />
        </Paper>
        <TextField
          onChange={ handleChange }
          data-testid="email-input"
          label="email"
          variant="outlined"
          type="text"
          name="email"
          fullWidth
        />
        <TextField
          onChange={ handleChange }
          data-testid="password-input"
          label="password"
          variant="outlined"
          type="password"
          name="password"
          fullWidth
        />
        <Button
          onClick={ handleBtn }
          data-testid="btn"
          variant="contained"
          type="submit"
          name="btn"
          disabled={ isDisabled }
          fullWidth
        >
          Entrar
        </Button>
      </Stack>
    </CustomBox>
  );
}

export default Login;
