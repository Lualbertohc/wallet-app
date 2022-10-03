import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WalletForm from './components/WalletForm';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ WalletForm } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
