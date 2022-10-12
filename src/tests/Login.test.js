import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa a página Login', () => {
//   const EMAIL = screen.getByTestId('email-input');
//   const PASSWORD = screen.getByTestId('password-input');
//   const BTN = screen.getByTestId('btn');

  it('Verificar inputs', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const EMAIL = screen.getByTestId('email-input');
    const PASSWORD = screen.getByTestId('password-input');
    const BTN = screen.getByTestId('btn');
    expect(EMAIL).toBeDefined();
    expect(PASSWORD).toBeDefined();

    userEvent.type(EMAIL, 'teste@teste.com');
    userEvent.type(PASSWORD, '');
    expect(BTN).toBeDisabled();

    userEvent.type(EMAIL, 'trybe@trybe.com');
    userEvent.type(PASSWORD, 'trybe');
    userEvent.click(BTN);
    waitFor(() => {
      expect(history.location.pathname).toBe('/carteira');
    });
  });
});
