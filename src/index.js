import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './reactDayPickerStyle.css';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import postStore from './stores/postStore';

useStrict(true);

ReactDOM.render(
  <Provider postStore={postStore} >
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
