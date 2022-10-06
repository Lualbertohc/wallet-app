import requisition from '../../services/data';

export const GET_EMAIL = 'GET_EMAIL';
export const GET_API = 'GET_API';
export const GET_WALLET_FORM = 'GET_WALLET_FORM';

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const getApi = (payload) => ({
  type: GET_API,
  payload,
});

export const getWalletFormAction = (payload) => ({
  type: GET_WALLET_FORM,
  payload,
});

export const fetchWithThunk = () => async (dispatch) => {
  try {
    const response = await requisition();
    delete (response.USDT);
    const coins = Object.keys(response);
    dispatch(getApi(coins));
  } catch (error) {
    console.log(error);
  }
};

export const getWalletForm = (obj) => async (dispatch) => {
  try {
    const response = await requisition();
    obj.exchangeRates = response;
    dispatch(getWalletFormAction(obj));
  } catch (error) {
    console.log(error);
  }
};
