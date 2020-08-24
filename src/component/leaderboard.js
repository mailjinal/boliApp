import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { days, Types } from '../commonFunction'
import _ from 'lodash'

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
  tableCellHighlight: {
    color:'green'
  }
}));

function LeaderComponent(props) {
  const classes = useStyles();
  let finalList = []
  let a = _.groupBy(props.tableData ,x => x.day)
  Object.keys(a).forEach(key => {
    const list = a[key]
    if(key !== '10') {
      const high = _.sortBy(list, ['amount']).reverse().slice(0, 1)
      finalList.push(high[0])
    } else {
      const groupedbyTypeList = _.groupBy(list, x => x.type)
      Object.keys(groupedbyTypeList).forEach(v => {
        const high = _.sortBy(groupedbyTypeList[v], ['amount']).reverse().slice(0, 1)
        finalList.push(high[0])
      })

    }
  })
  return (
    <TableContainer component={Paper}>
      <h3>હાલના દાતાઓ</h3>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Rs.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {finalList.map((row, i) => {
           return <TableRow key={i}>
              <TableCell align="center">{days.filter(d => d.value === row.day)[0].name}</TableCell>
              <TableCell align="center">{Types[row.day - 1][row.type].name}</TableCell>
              <TableCell align="center">{`${row.name} / ${row.phoneNumber}`}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LeaderComponent