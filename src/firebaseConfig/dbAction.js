import Firebase from 'firebase'

const writeUserData = () => {
    Firebase.database().ref('/').set(this.state);
    console.log('DATA SAVED');
}

const getUserData = () => {
    let ref = Firebase.database().ref('/');
    ref.on('value', snapshot => {
        const state = snapshot.val();
        console.log('DATA RETRIEVED', state);
    });
    console.log('DATA RETRIEVED');
}

export {
    writeUserData,
    getUserData
}