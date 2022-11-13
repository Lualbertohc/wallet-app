import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Header() {
  const { email, sum } = props;

  return (
    <div>
      <p data-testid="email-field">{ email }</p>
      <p data-testid="total-field">
        {sum.reduce((acc, cur) => {
          const result = Number(cur.exchangeRates[cur.currency].ask);
          return acc + Number(cur.value) * result;
        }, 0).toFixed(2)}
      </p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  sum: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
