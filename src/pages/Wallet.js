import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import WalletTable from '../components/WalletTable';

function Wallet() {
  return (
    <div>
      <Header />
      <WalletForm />
      <WalletTable />
    </div>
  );
}

export default Wallet;
