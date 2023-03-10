import { GET_API, GET_WALLET_FORM, DEL } from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_API:
    return {
      ...state,
      currencies: [...action.payload],
    };

  case GET_WALLET_FORM:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case DEL:
    return {
      ...state,
      expenses: [...state.expenses].filter((element) => element.id !== action.payload.id),
    };

  default:
    return state;
  }
}

export default wallet;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
