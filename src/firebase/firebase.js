import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB3JYZTBqr9orw4oU8KWRfNGpVnF7M5PNs",
    authDomain: "expensify-3b892.firebaseapp.com",
    databaseURL: "https://expensify-3b892.firebaseio.com",
    projectId: "expensify-3b892",
    storageBucket: "expensify-3b892.appspot.com",
    messagingSenderId: "1054952314509"
};

firebase.initializeApp(config);

const database = firebase.database();

// database.ref().set({
//     name: 'Cody Wanless',
//     age: 24,
//     isSingle: true,
//     location: {
//         city: 'Ih8',
//         country: 'United States'
//     }
// }).then(() => console.log('data saved'))
// .catch(e => console.log('Error; ', e));
 
// database.ref('attributes').set({
//     height: 70,
//     weight: 180
// }).then(() => console.log(''))
// .catch(e => console.log('Error: ', e));

// database.ref('isSingle').remove().then(() => console.log('Remove succeeded')).catch(e => console.log('Error removing: ', e));

// database.ref('isSingle').set(null).then(() => console.log('Remove succeeded')).catch(e => console.log('Error removing: ', e));

// database.ref().update({
//     name: 'Daddy',
//     age: 29
// }).then(() => console.log('Remove succeeded')).catch(e => console.log('Error removing: ', e));

// database.ref().on('value', snapshot => {
//     console.log(snapshot.val());
// });

// database.ref('location/city').once('value').then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
// }).catch(e => {
//     console.log('Error fetching data', e);
// });