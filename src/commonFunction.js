import axios from 'axios';

const validateUser = (name, phonenumber, amount, type, minAmount, day) => {
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
  } else if (day === '') {
    alert('Please select day')
    isValid = false
  }
  return isValid
}

const days = [{
    value: 1,
    name: 'પાંચમ-રવિવાર-23/08/2020',
    date: '9/08/2020'
  },
  {
    value: 2,
    name: 'છઠ-સોમવાર-24/08/2020',
    date: '10/08/2020'
  },
  {
    value: 3,
    name: 'સાતમ-મંગળવાર-25/08/2020',
    date: '10/08/2020'
  },
  {
    value: 4,
    name: 'આઠમ-બુધવાર-26/08/2020',
    date: '11/08/2020'
  },
  {
    value: 5,
    name: 'નોમ/દસમ-ગુરુવાર-27/08/2020',
    date: '13/08/2020'
  },
  {
    value: 6,
    name: 'અગિયારસ-શુક્રવાર-28/08/2020',
    date: '28/08/2020'
  },
  {
    value: 7,
    name: 'બારસ-શનિવાર-29/08/2020',
    date: '29/08/2020'
  },
  {
    value: 8,
    name: 'બારસ-રવિવાર-30/08/2020',
    date: '30/08/2020'
  },
  {
    value: 9,
    name: 'તેરસ-સોમવાર-31/08/2020',
    date: '31/08/2020'
  },
  {
    value: 10,
    name: 'ચૌદસ-મંગળવાર-01/09/2020',
    date: '01/09/2020'
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
  'બોલી:૫૦૦/- ના ગુણાંકમાં રકમ dropdown ભરવી દાખલા તરીકે ૩૦૦૦,૩૫૦૦,૪૦૦૦...,૧૦૦૦૦,૧૦૫૦૦',
  'સવારના ૯.૦૦ વાગ્યાથી રાત્રે ૯.૦૦  વાગ્યા સુધી બોલી ભરી શકાશે.',
  'બોલી સબમિટ થઇ એટલે SMS માં આવેલો OTP લખવો અને ત્યારબાદ કોન્ફીર્મ સબમિટ કરવું',
  '#By Jinal Shah'
]

const sendSMS = (code) => {
  return new Promise((resolve, reject) => {
    return axios.get('')
      .then(res => {

      })
      .catch(err => {

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