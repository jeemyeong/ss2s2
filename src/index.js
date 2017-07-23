import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
// import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './reactDayPickerStyle.css';
import './animation.css';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import postStore from './stores/postStore';
import authStore from './stores/authStore';

useStrict(true);

ReactDOM.render(
  <Provider 
    postStore={postStore} 
    authStore={authStore} 
  >
    <App />
  </Provider>
, document.getElementById('root'));
// registerServiceWorker();
