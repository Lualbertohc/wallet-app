import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WalletForm from './components/WalletForm';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ WalletForm } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
