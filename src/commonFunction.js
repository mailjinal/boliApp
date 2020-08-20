import axios from 'axios';

const validateUser = (name, phonenumber, amount, type, minAmount, day) => {
  let isValid = true;
  let re = /^[A-Za-z ]+$/
  if ((!re.test(name)) || name.length <= 3) {
    alert('Please enter proper your name.(Minimun 3 character, No special character and Numbers!!)')
    isValid = false
  } else if (phonenumber === '') {
    alert('Please fill your phonenumber(No Alphabates!)')
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
  } else if (day === '') {
    alert('Please select day')
    isValid = false
  }
  return isValid
}

const days = [{
    value: 1,
    name: 'પાંચમ-રવિવાર-23/08/2020',
    date: '21/08/2020'
  },
  {
    value: 2,
    name: 'છઠ-સોમવાર-24/08/2020',
    date: '22/08/2020'
  },
  {
    value: 3,
    name: 'સાતમ-મંગળવાર-25/08/2020',
    date: '23/08/2020'
  },
  {
    value: 4,
    name: 'આઠમ-બુધવાર-26/08/2020',
    date: '24/08/2020'
  },
  {
    value: 5,
    name: 'નોમ/દસમ-ગુરુવાર-27/08/2020',
    date: '25/08/2020'
  },
  {
    value: 6,
    name: 'અગિયારસ-શુક્રવાર-28/08/2020',
    date: '26/08/2020'
  },
  {
    value: 7,
    name: 'બારસ-શનિવાર-29/08/2020',
    date: '27/08/2020'
  },
  {
    value: 8,
    name: 'બારસ-રવિવાર-30/08/2020',
    date: '28/08/2020'
  },
  {
    value: 9,
    name: 'તેરસ-સોમવાર-31/08/2020',
    date: '29/08/2020'
  },
  {
    value: 10,
    name: 'ચૌદસ-મંગળવાર-01/09/2020',
    date: '30/08/2020'
  }
]

const Types = [
  [{
    value: 0,
    name: 'મૂળનાયક ચંદ્રપ્રભુની શાંતિધારા'
  }],
  [{
    value: 0,
    name: 'મૂળનાયક ચંદ્રપ્રભુની શાંતિધારા'
  }],
  [{
    value: 0,
    name: 'મૂળનાયક ચંદ્રપ્રભુની શાંતિધારા'
  }],
  [{
    value: 0,
    name: 'મૂળનાયક ચંદ્રપ્રભુની શાંતિધારા'
  }],
  [{
    value: 0,
    name: 'મૂળનાયક ચંદ્રપ્રભુની શાંતિધારા'
  }],
  [{
    value: 0,
    name: 'મૂળનાયક ચંદ્રપ્રભુની શાંતિધારા'
  }],
  [{
    value: 0,
    name: 'મૂળનાયક ચંદ્રપ્રભુની શાંતિધારા'
  }],
  [{
    value: 0,
    name: 'મૂળનાયક ચંદ્રપ્રભુની શાંતિધારા'
  }],
  [{
    value: 0,
    name: 'મૂળનાયક ચંદ્રપ્રભુની શાંતિધારા'
  }],
  [{
      value: 0,
      name: 'મૂળનાયક ચંદ્રપ્રભુની શાંતિધારા'
    },
    {
      value: 1,
      name: 'આદિનાથની શાંતિધારા'
    },
    {
      value: 2,
      name: 'પાર્શ્વનાથની શાંતિધારા'
    },
    {
      value: 3,
      name: 'વાસુપૂજ્યની શાંતિધારા'
    },
    {
      value: 4,
      name: 'અનંતનાથની શાંતિધારા'
    },
  ],
]

const Notes = [
  'બોલી:૫૦૦/- ના ગુણાંકમાં રકમ ભરવી દાખલા તરીકે ૩૦૦૦,૩૫૦૦,૪૦૦૦...,૧૦૦૦૦,૧૦૫૦૦',
  'નામ અને અટક અંગ્રેજીમાં લખવું.',
  'OTP સબમીટ કરતા પહેલા બોલીની રકમ અને ફોન નંબર ધ્યાનથી વાંચવો.',
]

const sendSMS = (OTP, phonenumber, callback, failCallback) => {
  return new Promise((resolve, reject) => {
    return axios.get(`https://2factor.in/API/V1/1c34d19e-db07-11ea-9fa5-0200cd936042/SMS/+91${phonenumber}/${OTP}/boli_app`)
      .then(res => {
        callback()
        console.log(`OTP ${OTP} is sent to phonenumber ${phonenumber}`)
      })
      .catch(err => {
        alert(`We are not able to send OTP to ${phonenumber}. Please check phone number again.`)
        failCallback()
        console.log(`FAIL: OTP ${OTP} is not sent to phonenumber ${phonenumber}`, err.toString())
      })
  })
}

export {
  validateUser,
  sendSMS,
  days,
  Types,
  Notes
}