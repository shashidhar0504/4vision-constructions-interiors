import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { GA_ID, GSC_VERIFICATION } from './lib/config';

// Search Console verification (HTML tag method), only when a token is configured.
if (GSC_VERIFICATION) {
  const meta = document.createElement('meta');
  meta.name = 'google-site-verification';
  meta.content = GSC_VERIFICATION;
  document.head.appendChild(meta);
}

// Google Analytics 4, only when a measurement ID is configured.
if (GA_ID) {
  const loader = document.createElement('script');
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(loader);

  const inline = document.createElement('script');
  inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`;
  document.head.appendChild(inline);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
