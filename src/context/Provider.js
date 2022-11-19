import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import context from './context';
import requisition from '../services/data';

function Provider({ children }) {
  const [data, setData] = useState({});
  const [exchangeRatesInfo, setExchangeRatesInfo] = useState({});

  useEffect(() => {
    const fetchExchangeRatesNames = async () => {
      const response = await requisition();
      delete (response.USDT);
      const exchangeRates = response;
      const exchangeRatesNames = Object.keys(response);

      setData({ wallet: { currencies: exchangeRatesNames } });
      setExchangeRatesInfo(exchangeRates);
    };

    fetchExchangeRatesNames();
  }, []);

  const contextValue = useMemo(
    () => ({
      data,
      setData,
      exchangeRatesInfo,
      setExchangeRatesInfo,
    }),
    [data,
      setData,
      exchangeRatesInfo,
      setExchangeRatesInfo,
    ],
  );
  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
