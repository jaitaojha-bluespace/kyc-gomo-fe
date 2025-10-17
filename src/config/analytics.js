import ReactGA from 'react-ga4';

// Initialize Google Analytics
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

export const initGA = () => {
  if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_TRACKING_ID);
    console.log('Google Analytics initialized with ID:', GA_TRACKING_ID);
  } else {
    console.warn('Google Analytics not initialized - no tracking ID provided');
  }
};

// Track page views
export const trackPageView = (page) => {
  ReactGA.send({ hitType: 'pageview', page });
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  ReactGA.event({
    action,
    category,
    label,
    value
  });
};

// Track SIM registration flow events
export const trackSimRegistrationEvent = (step, action, details = {}) => {
  trackEvent(action, 'SIM Registration', step, details);
};

// Track document capture events
export const trackDocumentCapture = (action, success = true) => {
  trackEvent(action, 'Document Capture', success ? 'Success' : 'Failed');
};

// Track face capture events
export const trackFaceCapture = (action, success = true) => {
  trackEvent(action, 'Face Capture', success ? 'Success' : 'Failed');
};

// Track smile liveness events
export const trackSmileLiveness = (action, success = true) => {
  trackEvent(action, 'Smile Liveness', success ? 'Success' : 'Failed');
};

export default ReactGA;
