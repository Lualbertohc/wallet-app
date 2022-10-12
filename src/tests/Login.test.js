import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa a página Login', () => {
//   const E = screen.getByTestId('email-input');
//   const P = screen.getByTestId('password-input');
//   const B = screen.getByTestId('btn');

  it('Verifica se existem os inputs de email e password', () => {
    renderWithRouterAndRedux(<App />);
    const E = screen.getByTestId('email-input');
    const P = screen.getByTestId('password-input');
    expect(E).toBeDefined();
    expect(P).toBeDefined();
  });

  it('Verifica se o button Entrar está desabilitado com inputs incompletos', () => {
    renderWithRouterAndRedux(<App />);
    const E = screen.getByTestId('email-input');
    const P = screen.getByTestId('password-input');
    const B = screen.getByTestId('btn');
    userEvent.type(E, 'teste@teste.com');
    userEvent.type(P, '');
    expect(B).toBeDisabled();
  });

  it('Verifica se clicar no button Entrar redireciona para "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const E = screen.getByTestId('email-input');
    const P = screen.getByTestId('password-input');
    const B = screen.getByTestId('btn');
    userEvent.type(E, 'trybe@trybe.com');
    userEvent.type(P, 'trybe');
    userEvent.click(B);
    waitFor(() => {
      expect(history.location.pathname).toBe('/carteira');
    });
  });
});
