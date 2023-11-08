const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');
// const serviceAccount = require('../../serviceAccountKey2.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-44abd-default-rtdb.firebaseio.com',
    ignoreUndefinedProperties: true,
});
const db = getFirestore();
const messaging = admin.messaging();
export { db, Timestamp, messaging };
