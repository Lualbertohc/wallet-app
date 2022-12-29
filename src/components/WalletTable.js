import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useContext } from 'react';
import context from '../context/context';

export default function WalletTable() {
  const { data } = useContext(context);
  const { wallet: { expenses } } = data;

  return (
    <TableContainer component={ Paper }>
      <Table sx={ { minWidth: 650 } } aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>descrição</TableCell>
            <TableCell align="right">tag</TableCell>
            <TableCell align="right">método de pagamento</TableCell>
            <TableCell align="right">valor</TableCell>
            <TableCell align="right">moedas</TableCell>
            <TableCell align="right">câmbio utilizado</TableCell>
            <TableCell align="right">valor convertido</TableCell>
            <TableCell align="right">moeda de conversão</TableCell>
            <TableCell align="right">editar/excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses !== undefined && expenses.map((info) => (
            <TableRow
              key={ info.id }
              sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
            >
              <TableCell component="th" scope="row">
                {info.description}
              </TableCell>
              <TableCell align="right">{info.tag}</TableCell>
              <TableCell align="right">{info.method}</TableCell>
              <TableCell align="right">{Number(info.value).toFixed(2)}</TableCell>
              <TableCell align="right">{info.currency}</TableCell>
              <TableCell align="right">
                {Number(info.exchangeRates[info.currency].ask).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {
                  Number(info.value * info.exchangeRates[info.currency].ask).toFixed(2)
                }
              </TableCell>
              <TableCell align="right">real</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
