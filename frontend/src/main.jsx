import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import dotenv from "dotenv";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App />
    </GoogleOAuthProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
