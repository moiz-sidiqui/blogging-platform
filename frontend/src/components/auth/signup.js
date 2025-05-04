import React, { useState } from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null); // State to hold the selected profile image file
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); 
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profileImage', profileImage);

      const response = await axios.post('http://localhost:5001/api/register/signUp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) { 
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          navigate('/');
        }, 2000);
      } else {
        setShowErrorAlert(true);
        setErrorMessage(response.data.message);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Registration failed!', error.response.data.message);
      setShowErrorAlert(true);
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(pictures/signup.jpeg)', opacity: 0.6 }}></div>
      <div className="flex flex-col justify-center items-center relative z-10">
        <div className="sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow-lg mt-5">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">User Registration</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
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
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
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
              <label htmlFor="profileImage" className="block text-sm font-medium leading-6 text-gray-900">Profile Image</label>
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                onChange={(e) => setProfileImage(e.target.files[0])}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">Already Registered? <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">Login now</Link></p>
        </div>
      </div>
      {showSuccessAlert && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-64 p-4 bg-green-600 text-white text-center rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Success!</p>
          <p className="text-sm mt-2">User registered successfully</p>
        </div>
      )}
      {showErrorAlert && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-64 p-4 bg-red-600 text-white text-center rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Error!</p>
          <p className="text-sm mt-2">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
