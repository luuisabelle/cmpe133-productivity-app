import React, { useContext, createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
      const verifyToken = async () => {
          if (token) {
              try {
                  setLoading(true)
                  const response = await fetch("http://localhost:5000/api/auth/verify", {
                      headers: {
                          'Authorization': `Bearer ${token}`
                      }
                  });
                  
                  if (response.ok) {
                      const data = await response.json()
                      setCurrentUser(data.user)
                      setIsAuthenticated(true)
                  } else {
                      localStorage.removeItem('token')
                      setToken(null)
                      setIsAuthenticated(false)
                  }
              } catch (error) {
                  console.error('Token verification failed', error)
                  localStorage.removeItem('token')
                  setToken(null)
                  setIsAuthenticated(false)
              } finally {
                setLoading(false) 
            }
        } else {
            setLoading(false)
          }
      };

      verifyToken()
  }, [token]); 

  const googleSignIn = async (credentialResponse) => {
    try {
          setLoading(true)
            const response = await fetch("http://localhost:5000/api/auth/google", {
                method:"POST",
                headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${credentialResponse.credential}`
              },
              referrerPolicy: 'strict-origin-when-cross-origin'
              })
              const data = await response.json()

              if (response.ok) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                setCurrentUser(data.user)
                setIsAuthenticated(true)
                navigate('/')
                return true;
              }
              setLoading(false)
              return false;
        }
        catch(error) {
            console.error('Failed to signup user', error)
            setLoading(false)
            localStorage.removeItem('token');
            setToken(null);
            setCurrentUser(null);
            setIsAuthenticated(false);
            return false;
        }
  }

    const signup = async(username, password) => {
        try {
          setLoading(true)
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username, password
                }),
              })
              const data = await response.json()
              if (response.ok) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                setCurrentUser(data.user)
                setIsAuthenticated(true)
                navigate('/')
                return true;
              }
              setLoading(false)
              return false;
        }
        catch(error) {
            console.error('Failed to signup user', error)
            setLoading(false)
            return false;
        }
    }

    const login = async(username, password) => {
        try {
          setLoading(true)
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username, password
                }),
              })
              const data = await response.json()
              if (data.success) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                setCurrentUser(data.user)
                setIsAuthenticated(true)
                navigate('/')
                return true;
              }
              setLoading(false)
              return false;
        }
        catch(error) {
            console.error('Failed to login user', error)
            setLoading(false)
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setCurrentUser(null)
        setIsAuthenticated(false)
        navigate('/signin')
    };


    return (
        <AuthContext.Provider value={{currentUser, token, login, signup, logout, isAuthenticated, setIsAuthenticated, loading, googleSignIn}}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}