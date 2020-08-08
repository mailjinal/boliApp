import Firebase from 'firebase';
import moment from 'moment'
const config = {
    apiKey: "AIzaSyCl8Hg3p9-7M5KlWCbou21hbleYwi0y6yc",
    authDomain: "boliapp-1ae99.firebaseapp.com",
    databaseURL: "https://boliapp-1ae99.firebaseio.com",
    projectId: "boliapp-1ae99",
    storageBucket: "boliapp-1ae99.appspot.com",
    messagingSenderId: "442200591170",
    appId: "1:442200591170:web:0bb939803917d791d916db",
    measurementId: "G-PFTNVPSRZK"
}

Firebase.initializeApp(config)

const writeUserData = (name, phoneNumber, amount, day, type) => {
    Firebase.database().ref('/boli/')
    .push({name, phoneNumber, amount, day, type, date: moment().format('DD-MMM-YYYY hh:mm A')});
    console.log('DATA SAVED');
}

const getUserData = (callback) => {
    let ref = Firebase.database().ref('/boli/');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      if(state) {
        callback(state)
      }
    });
  }




export {writeUserData,getUserData };