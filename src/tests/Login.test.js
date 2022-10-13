import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockFetch from './helpers/mockFetch';
import App from '../App';
import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';
import Table from '../components/Table';
import Header from '../components/Header';

describe('Verificar os componentes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Verificar inputs de Login.js', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const EMAIL_LOGIN = screen.getByTestId('email-input');
    const PASSWORD_LOGIN = screen.getByTestId('password-input');
    const BTN_LOGIN = screen.getByTestId('btn');
    const EMAIL_TEXT = screen.getByText(/email:/i);
    const PASSWORD_TEXT = screen.getByText(/password:/i);

    expect(EMAIL_LOGIN).toBeDefined();
    expect(PASSWORD_LOGIN).toBeDefined();

    expect(EMAIL_TEXT).toBeInTheDocument();
    expect(PASSWORD_TEXT).toBeInTheDocument();

    userEvent.type(EMAIL_LOGIN, 'teste@teste.com');
    userEvent.type(PASSWORD_LOGIN, '');
    expect(BTN_LOGIN).toBeDisabled();

    userEvent.type(EMAIL_LOGIN, 'trybe@trybe.com');
    userEvent.type(PASSWORD_LOGIN, 'password');
    userEvent.click(BTN_LOGIN);
    waitFor(() => {
      expect(history.location.pathname).toBe('/carteira');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('Verificar inputs de WalletForm.js', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const IMP1 = screen.getByTestId('value-input');
    const IMP2 = screen.getByTestId('description-input');
    const BTN_WALLET = screen.getByTestId('btn-wallet');

    expect(IMP1).toBeInTheDocument();
    expect(IMP2).toBeInTheDocument();

    userEvent.type(IMP1, 100);
    userEvent.type(IMP2, 'sorvete');
    userEvent.click(BTN_WALLET);
    waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('Verificar Wallet.js', () => {
    renderWithRouterAndRedux(<Wallet />);
    const H1 = screen.getByRole('heading', {
      name: /trybewallet/i,
    });
    expect(H1).toBeInTheDocument();
  });

  it('Verificar Table', () => {
    renderWithRouterAndRedux(<Table />);
    const TEXT1 = screen.getByRole('columnheader', {
      name: /descrição/i,
    });
    const TEXT2 = screen.getByRole('columnheader', {
      name: /tag/i,
    });
    const TEXT3 = screen.getByRole('columnheader', {
      name: /método de pagamento/i,
    });
    const TEXT4 = screen.getByRole('columnheader', {
      name: /câmbio utilizado/i,
    });
    const TEXT5 = screen.getByRole('columnheader', {
      name: /valor convertido/i,
    });
    const TEXT6 = screen.getByRole('columnheader', {
      name: /moeda de conversão/i,
    });
    expect(TEXT1).toBeInTheDocument();
    expect(TEXT2).toBeInTheDocument();
    expect(TEXT3).toBeInTheDocument();
    expect(TEXT4).toBeInTheDocument();
    expect(TEXT5).toBeInTheDocument();
    expect(TEXT6).toBeInTheDocument();
  });

  it('Verificar Header', () => {
    renderWithRouterAndRedux(<Header />);
    const TAG1 = screen.getByTestId('email-field');
    const TAG2 = screen.getByTestId('total-field');

    expect(TAG1).toBeInTheDocument();
    expect(TAG2).toBeInTheDocument();
  });
});
