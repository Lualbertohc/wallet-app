import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useContext } from 'react';
import context from '../context/context';

function Header() {
  const { data } = useContext(context);

  const { user: { email } } = data;

  return (
    <Box sx={ { flexGrow: 1 } }>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={ { mr: 2 } }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
            You Wallet
          </Typography>
          <Button color="inherit">{ `Email: ${email}` }</Button>
          <Button color="inherit">BRL</Button>
        </Toolbar>
      </AppBar>
    </Box>
    // <CustonHeader>
    //   <img src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2065962-1746111.png" alt="icon" width="70" />
    //   <CustonBox>
    //     <p data-testid="email-field">{ `Email: ${email}` }</p>
    //     <p data-testid="header-currency-field">BRL</p>
    //   </CustonBox>
    // </CustonHeader>
  );
}

export default Header;
