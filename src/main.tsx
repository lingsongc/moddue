/** Browser entry point: load bundled typefaces and shared theme before mounting the app. */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@fontsource-variable/google-sans/full.css';
import '@fontsource-variable/urbanist';
import './theme.css';
import './fonts.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
