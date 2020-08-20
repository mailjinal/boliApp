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
import moment from 'moment'
import { validateUser, sendSMS, days, Types, Notes } from './commonFunction'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 30
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  templeName: {
    color: 'red'
  },
  copyrightText: {
    fontWeight: "bold"
  },
  copyrightText1: {
    fontWeight: "bold",
    textAlign: 'right',
    color: theme.palette.text.secondary,
  }
}));

function App() {
  const [day, setDay] = React.useState('');
  const [name, setName] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [amount, setAmount] = React.useState(500)
  const [minAmount, setMinAmount] = React.useState(500)
  const [type, setType] = React.useState('');
  const [data, setData] = React.useState([]);
  const [fullData, setFullData] = React.useState([])
  const [isOTPShow, setisOTPShow] = React.useState(false)
  const [OTP, setOTP] = React.useState('')
  const [confirmOTP, setConfirmOTP] = React.useState('')
  const classes = useStyles();

  const handleListFilterChanges = (updatedList) => {
    const firstElement = updatedList[0]
    if (firstElement) {
      const amountUpdated = firstElement.amount + 500
      setMinAmount(amountUpdated)
      setAmount(amountUpdated)
      setData(updatedList)
    } else {
      setMinAmount(500)
      setAmount(500)
      setData([])
    }
  }

  const handleChangeDay = (event) => {
    setDay(event.target.value);
    let x = _.sortBy(fullData.filter(b => b.day === event.target.value && b.type === type), ['amount']).reverse().slice(0, 3)
    handleListFilterChanges(x)
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
    let x = _.sortBy(fullData.filter(b => b.day === day && b.type === event.target.value), ['amount']).reverse().slice(0, 3)
    handleListFilterChanges(x)
  };

  const filterData = (state) => {
    const formatState = Object.keys(state).map(a => state[a])
    let x = _.sortBy((formatState).filter(b => b.day === parseInt(document.getElementById('dayid').value) && b.type === parseInt(document.getElementById('typeid').value)), ['amount']).reverse().slice(0, 3)
    handleListFilterChanges(x)
    setFullData(formatState)
  }

  const submitBoli = () => {
    if (validateUser(name, phoneNumber, parseInt(amount), type, minAmount, day)) {
      const OTP = phoneNumber.slice(-2) + Date.now().toString().slice(-2);
      console.log(OTP)
      setConfirmOTP(OTP)
      // eslint-disable-next-line no-restricted-globals
      const responseConfirm = confirm(`Do you want to add boli for Rs. ${amount}? If you press OK, OTP will be sent to your phone number : ${phoneNumber}`);
      if (responseConfirm) {
        sendSMS(OTP, phoneNumber, () => {
          setisOTPShow(true)
        }, () => {
          setPhoneNumber('')
        })
      } else {
        setAmount(minAmount)
        setConfirmOTP('')
      }
    } else {
      setAmount(minAmount)
    }
  }

  const submitOTP = () => {
    if (confirmOTP === OTP) {
      writeUserData(name, phoneNumber, parseInt(amount), day, type)
      setName('')
      setPhoneNumber('')
    } else {
      alert('Please re-enter boli with latest OTP.')
      setName('')
      setPhoneNumber('')
    }
    setisOTPShow(false)
    setOTP('')
    setConfirmOTP('')

  }

  React.useEffect(() => {
    getUserData((state) => {
      filterData(state)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterDay = days
    .filter(d => moment().isSame(moment(d.date, 'DD/MM/YYYY'), 'day')
    )

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <input id={'dayid'} style={{ display: 'none' }} value={day} readOnly />
            <input id={'typeid'} style={{ display: 'none' }} value={type} readOnly />
            <img src={Logo} alt='chandraprabhuImge' style={{ width: '60%', height: '10%' }} />
            <h3 className={classes.templeName}>શ્રી ચંદ્રપ્રભુ દિગમ્બર જૈન મંદિર,ગોપીપુરા,સુરત</h3>
            {Notes.map((text, i) => <p key={i}>{text}</p>)}
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
                label="Phone No(only 10 Digit)"
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
                > {filterDay.map(day => <MenuItem key={day.value}
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
                  {(Types[day - 1] || []).map(type =>
                    <MenuItem key={type.value}
                      value={type.value}>{type.name}
                    </MenuItem>)}
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
                disabled={moment().hour() < 7}
                variant="contained"
                color="primary"
                onClick={() => { submitBoli() }}>
                Boli
                </Button>
            </Grid>
            {isOTPShow && <Grid item xs={12} sm={12} style={{ padding: 10 }}>
              <TextField id="standard-basic"
                type='number'
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                label="OTP" />
              <Button
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                onClick={() => { submitOTP() }}>
                Submit OTP
                </Button>
            </Grid>}
            <p className={classes.copyrightText}>{'આભાર ટ્રસ્ટીગણ'}</p>
          </Paper>
          <p className={classes.copyrightText1}>{'#By Jinal Shah'}</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
