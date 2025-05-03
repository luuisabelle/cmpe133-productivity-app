import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <GoogleOAuthProvider clientId='1019470647576-v8k9cdftm9u3emjputkcc4kpm8abrgnt.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
