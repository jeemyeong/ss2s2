# SS2S2

### make `src/database/databse.js`
```
import * as firebase from 'firebase';

const config = {
  apiKey: 'your api key',
  projectId: 'ss2s2-75a50',
  authDomain: 'ss2s2-75a50.firebaseapp.com',
  databaseURL: 'https://ss2s2-75a50.firebaseio.com/',
  storageBucket: 'gs://ss2s2-75a50.appspot.com',
  messagingSenderId: 'your messaging sender Id'
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth;
export const storage = firebase.storage();
```