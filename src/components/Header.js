import React, { useContext } from 'react';
import context from '../context/context';

function Header() {
  const { data } = useContext(context);

  const { user: { email } } = data;

  return (
    <div>
      <p data-testid="email-field">{ email }</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

export default Header;
