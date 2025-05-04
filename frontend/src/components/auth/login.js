import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalStateContext } from '../../contexts/GlobalStateContext';
import { useContext } from 'react';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const navigate = useNavigate();

  const { setCurrentUsername, setCurrentProfileImage, updateAuthStatus } = useContext(GlobalStateContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setCurrentUsername(response.data.username);
      setCurrentProfileImage(response.data.userimage);
      updateAuthStatus(true);

      navigate('/home');
    } catch (error) {
      console.error('Login failed!', error.response.data);
      setShowErrorAlert(true);
      setErrorMessage(error.response.data.error); // Access specific error message
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 1000);
    }
  };
  

  return (
    <>
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(pictures/background.jpeg)', opacity: 0.6 }}></div>
        <div className="flex flex-col justify-center items-center relative z-10">

          <div className="sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow-lg mt-5">
            <img className="mx-auto h-25 w-auto" src="pictures/logo.png" alt="Your Company" />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">Log in to your account</h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                  <Link to="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">Not a member? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Register now</Link></p>
          </div>
        </div>
        {showErrorAlert && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-64 p-4 bg-red-600 text-white text-center rounded-lg shadow-lg z-50">
          <p className="text-lg font-semibold">Error!</p>
          <p className="text-sm mt-2">{errorMessage}</p>
        </div>
      )}
      </div>

    </>
  );
}
