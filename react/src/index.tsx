import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LicenseManager } from 'ag-grid-enterprise';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga4';
import { buildTracker } from './tracker';
import { checkAdBlocker } from './tracking.utils';
import { useDrawerStore, useUtilsStore } from './zus';
import { defaultTheme } from './theme';

import App from './views/App';

import 'ag-grid-enterprise/styles/ag-grid.css';
import 'ag-grid-enterprise/styles/ag-theme-alpine.css';

export const isProd = process.env.NODE_ENV === 'production';

// Firebase config - only initialize if API key is provided
const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
let analytics: any = null;
let db: any = null;

if (firebaseApiKey && firebaseApiKey !== 'unspecified') {
  const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: 'tool-dkhp-uit.firebaseapp.com',
    projectId: 'tool-dkhp-uit',
    storageBucket: 'tool-dkhp-uit.appspot.com',
    messagingSenderId: '473962295838',
    appId: '1:473962295838:web:24fcf634d9eee42d2db40f',
  };
  
  try {
    const app = initializeApp(firebaseConfig, { automaticDataCollectionEnabled: true });
    analytics = getAnalytics(app);
    db = getFirestore(app);
    getPerformance(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
} else {
  console.log('Firebase disabled - no API key provided');
}

export { analytics, db };

export const tracker = buildTracker();
checkAdBlocker().then((hasAdBlocker) => {
  tracker.updateProperty('hasAdBlocker', hasAdBlocker);
  tracker.updateProperty('leftDrawerInitiallyOpen', useDrawerStore.getState().isDrawerOpen);
  useUtilsStore.setState({ hasAdBlocker });
});

LicenseManager.setLicenseKey('I_<3_SCHOOL_NDEwMjMzMzIwMDAwMA==afc05c982fa05a2578eb9cab60c42d78');

// Initialize GA4 only if in production or if explicitly enabled
if (isProd || process.env.REACT_APP_ENABLE_GA4 === 'true') {
  try {
    ReactGA.initialize('G-HK94GQMRY2');
    console.log('GA4 initialized successfully');
  } catch (error) {
    console.warn('GA4 initialization failed:', error);
  }
} else {
  console.log('GA4 disabled in development');
}

ReactDOM.render(
  <SnackbarProvider>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <Analytics />
        <SpeedInsights />
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </SnackbarProvider>,
  document.getElementById('root'),
);
