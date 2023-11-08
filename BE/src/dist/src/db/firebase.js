"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messaging = exports.Timestamp = exports.db = void 0;
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
exports.Timestamp = Timestamp;
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');
// const serviceAccount = require('../../serviceAccountKey2.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-44abd-default-rtdb.firebaseio.com',
    ignoreUndefinedProperties: true,
});
const db = getFirestore();
exports.db = db;
const messaging = admin.messaging();
exports.messaging = messaging;
