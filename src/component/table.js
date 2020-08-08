import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 30
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
  },
}));

function TableComponent(props) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date/Time</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Rs.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableData.map((row, i) => {
           return <TableRow key={i}>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{`${row.name} / ${row.phoneNumber}`}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableComponent