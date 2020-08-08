import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TableComponent from './component/table'
import { writeUserData, getUserData } from './firebaseConfig/firebase'
import _ from 'lodash'
import Logo from './img/abc.jpeg';


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

const days = [
  { value: 1, name: 'પાંચમ-રવિવાર-23/08/2020' },
  { value: 2, name: 'છઠ-સોમવાર-24/08/2020' },
  { value: 3, name: 'સાતમ-મંગળવાર-25/08/2020' },
  { value: 4, name: 'આઠમ-બુધવાર-26/08/2020' },
  { value: 5, name: 'નોમ/દસમ-ગુરુવાર-27/08/2020' },
  { value: 6, name: 'અગિયારસ-શુક્રવાર-28/08/2020' },
  { value: 7, name: 'બારસ-શનિવાર-29/08/2020' },
  { value: 8, name: 'બારસ-રવિવાર-30/08/2020' },
  { value: 9, name: 'તેરસ-સોમવાર-31/08/2020' },
  { value: 10, name: 'ચૌદસ-મંગળવાર-01/09/2020' }
]

const Types = [
  [{ value: 0, name: 'શ્રીજી ની શાંતિધારા' }],
  [{ value: 0, name: 'શ્રીજી ની શાંતિધારા' }],
  [{ value: 0, name: 'શ્રીજી ની શાંતિધારા' }],
  [{ value: 0, name: 'શ્રીજી ની શાંતિધારા' }],
  [{ value: 0, name: 'શ્રીજી ની શાંતિધારા' }],
  [{ value: 0, name: 'શ્રીજી ની શાંતિધારા' }],
  [{ value: 0, name: 'શ્રીજી ની શાંતિધારા' }],
  [{ value: 0, name: 'શ્રીજી ની શાંતિધારા' }],
  [{ value: 0, name: 'શ્રીજી ની શાંતિધારા' }],
  [{ value: 0, name: 'શ્રીજી ની શાંતિધારા' }],
]

function App() {
  const [day, setDay] = React.useState(1);
  const [name, setName] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [amount, setAmount] = React.useState(500)
  const [minAmount, setMinAmount] = React.useState(500)
  const [type, setType] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [fullData, setFullData] = React.useState([])
  const classes = useStyles();

  const handleChangeDay = (event) => {
    setDay(event.target.value);
    let x = _.sortBy(
      fullData.filter(b => b.day === event.target.value && b.type === type)
      , ['amount']).reverse().slice(0, 3)
    if (x[0]) {
      setMinAmount(x[0].amount + 500)
      setAmount(x[0].amount + 500)
      setData(x)
    } else {
      setMinAmount(0)
      setAmount(500)
      setData([])
    }
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
    let x = _.sortBy(
      fullData.filter(b => b.day === day && b.type === event.target.value)
      , ['amount']).reverse().slice(0, 3)
    if (x[0]) {
      setMinAmount(x[0].amount + 500)
      setAmount(x[0].amount + 500)
      setData(x)
    } else {
      setMinAmount(0)
      setAmount(500)
      setData([])
    }
  };

  const filterData = (state) => {
    let x = _.sortBy(
      Object.keys(state).map(a =>
        state[a]).filter(b =>
          b.day === parseInt(document.getElementById('dayid').value)
          && b.type === parseInt(document.getElementById('typeid').value))
      , ['amount']).reverse().slice(0, 3)
    if (x[0]) {
      setMinAmount(x[0].amount + 500)
      setAmount(x[0].amount + 500)
      setData(x)
      setFullData(Object.keys(state).map(a =>
        state[a]))
    } else {
      setMinAmount(0)
      setAmount(500)
      setData([])
      setFullData(Object.keys(state).map(a =>
        state[a]))
    }
  }

  const validateUser = (name, phonenumber, amount, type, minAmount) => {
    let isValid = true;
    if (name === '') {
      alert('Please enter your name.')
      isValid = false
    } else if (phonenumber === '') {
      alert('Please fill your phonenumber')
      isValid = false
    } else if (phonenumber.length !== 10) {
      alert('please enter your mobile number in 10 digit')
      isValid = false
    } else if (amount % 500 !== 0 || amount < minAmount) {
      alert('Please enter proper amount.')
      isValid = false
    } else if (type === '') {
      alert('Please select type')
      isValid = false
    }
    return isValid
  }

  const submitBoli = () => {
    if (validateUser(name, phoneNumber, parseInt(amount), type, minAmount)) {
      writeUserData(name, phoneNumber, parseInt(amount), day, type)
    } else {
      setAmount(minAmount)
    }
  }

  React.useEffect(() => {
    getUserData((state) => {
      filterData(state)
    })
  }, [])

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <input id={'dayid'} style={{ display: 'none' }} value={day} />
            <input id={'typeid'} style={{ display: 'none' }} value={type} />
            <img src={Logo} alt='chandraprabhuImge' style={{ width: '80%', height: '20%' }} />
            <h3>ચંદ્રપ્રભુ દિગમ્બર જૈન મંદિર,ગોપીપુરા,સુરત</h3>
            <Grid item xs={12} sm={12}>
              <TextField
                id="standard-basic"
                label="Name Surname"
                value={name}
                onChange={(e) => { setName(e.target.value) }} />
              <TextField
                type="number"
                style={{ marginLeft: 10 }}
                id="standard-basic"
                label="Phone No(10 Digit)"
                value={phoneNumber}
                onChange={e => { setPhoneNumber(e.target.value) }} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={day}
                  onChange={handleChangeDay}
                > {days.map(day => <MenuItem key={day.value}
                  value={day.value}>{day.name}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label12">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label12"
                  id="demo-simple-select12"
                  value={type}
                  onChange={handleChangeType}
                >
                  {Types[day - 1].map(type => <MenuItem key={type.value}
                    value={type.value}>{type.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TableComponent tableData={data} />
            </Grid>
            <Grid item xs={12} sm={12} style={{ padding: 10 }}>
              <TextField id="standard-basic"
                type='number'
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  step: 500
                }}
                inputProps={{ min: minAmount, step: "500" }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                label="Amount" />
              <Button
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                onClick={() => { submitBoli() }}>
                Boli
                </Button>
            </Grid>
            <p>{'બોલી:૫૦૦/- ના ગુણાંકમાં રકમ dropdown ભરવી દાખલા તરીકે ૩૦૦૦,૩૫૦૦,૪૦૦૦...,૧૦૦૦૦,૧૦૫૦૦'}</p>
            <p>#By Jinal Shah</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
