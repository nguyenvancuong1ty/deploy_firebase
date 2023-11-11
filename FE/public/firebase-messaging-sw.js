// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: 'AIzaSyDcuDIddVQKAQoj0yMLrWsDTQDDAaAFY00',
    authDomain: 'fir-44abd.firebaseapp.com',
    databaseURL: 'https://fir-44abd-default-rtdb.firebaseio.com',
    projectId: 'fir-44abd',
    storageBucket: 'fir-44abd.appspot.com',
    messagingSenderId: '513391440326',
    appId: '1:513391440326:web:1c076486af50e8572742c7',
});

// firebase.initializeApp({
//     apiKey: 'AIzaSyCgd0v6ZSy2dGC6P-J6PnGDYJXxXBlkbns',
//     authDomain: 'shop-77414.firebaseapp.com',
//     projectId: 'shop-77414',
//     storageBucket: 'shop-77414.appspot.com',
//     messagingSenderId: '725958524225',
//     appId: '1:725958524225:web:e4835b4587a04e53b475c0',
//     measurementId: 'G-D4KHF90NFT',
// });
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    const notification = payload.data;
    const notificationOptions = {
        ...notification,
        icon: '/logo@.jpg',
    };

    self.registration.showNotification(notification.title, notificationOptions);
});
