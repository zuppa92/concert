import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Homepage from './pages/Home';
import ArtistList from './components/Artists/ArtistList'; // Update this import path if necessary
import Profile from './pages/Profile';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import SearchForm from './components/SearchForm'; // Import the SearchForm component
import ConcertApi from './services/api';
import { jwtDecode } from 'jwt-decode'; // Correct default import for jwtDecode
import { UserProvider } from './context/UserContextProvider'; // Correct import for UserProvider
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage('token', null);
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state

  useEffect(() => {
    async function fetchCurrentUser() {
      if (token) {
        try {
          console.log('Fetching current user with token:', { token });
          if (typeof token === 'string' && token.trim() !== '') {
            const parts = token.split('.');
            if (parts.length !== 3) {
              throw new Error('Invalid token format');
            }
            ConcertApi.token = token;
            const decodedToken = jwtDecode(token); // Decode the token
            console.log('Decoded token:', decodedToken);
            const response = await ConcertApi.getCurrentUser();
            console.log('Full response from getCurrentUser:', response);
            setUser(response.user);
            console.log('User set in state:', response.user);
          } else {
            console.error('Invalid token format');
            setUser(null);
          }
        } catch (err) {
          console.error('Failed to fetch current user', err);
          setUser(null);
        }
      }
    }
    fetchCurrentUser();
  }, [token]);

  const login = async (formData) => {
    try {
      const { token: newToken } = await ConcertApi.login(formData);
      console.log('Token received after login:', newToken); // Debugging line
      setToken(newToken);
      ConcertApi.token = newToken;
      const response = await ConcertApi.getCurrentUser();
      console.log('Current user after login:', response);
      setUser(response.user);
    } catch (err) {
      console.error('Login failed', err);
      throw err;
    }
  };

  const signup = async (formData) => {
    try {
      const { token: newToken } = await ConcertApi.register(formData);
      console.log('Token received after signup:', newToken); // Debugging line
      setToken(newToken);
      ConcertApi.token = newToken;
      const response = await ConcertApi.getCurrentUser();
      console.log('Current user after signup:', response);
      setUser(response.user);
    } catch (err) {
      console.error('Signup failed', err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    ConcertApi.token = null;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <UserProvider user={user} setUser={setUser}>
      <Router>
        <NavBar logout={logout} />
        <Routes>
          <Route path="/" element={user ? <Homepage /> : <Navigate to="/login" />} />
          <Route
            path="/artists"
            element={
              user ? (
                <>
                  <SearchForm onSearch={handleSearch} /> {/* Add SearchForm */}
                  <ArtistList searchTerm={searchTerm} /> {/* Pass search term to ArtistList */}
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;