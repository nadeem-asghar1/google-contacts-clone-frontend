import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import Interceptor from './components/common/Interceptor';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_GOOGLE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_GOOGLE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_GOOGLE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_GOOGLE_FIREBASE_MEASURING_SENDER_ID,
  appId: process.env.REACT_APP_GOOGLE_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_GOOGLE_FIREBASE_MEASUREMENT_ID
};

Interceptor.setupInterceptors(store);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);
