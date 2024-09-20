import React, { useState, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MedicalDetails from './MedicalDetails';

gsap.registerPlugin(ScrollTrigger);

const LoginSignup = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showEmergencyFields, setShowEmergencyFields] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    emergencyContact: '',
    insuranceInfo: '',
    medicalHistory: '',
    signature: ''
  });
  const [fileData, setFileData] = useState({
    insuranceCard: null,
    medicalRecords: null,
    consentForm: null,
    signature: null,
    governmentId: null
  });
  const formRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFileData(prevState => ({
      ...prevState,
      [id]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    
    // For login, we only need email and password
    if (!isSignup) {
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
    } else {
      // For signup, append all form data
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      Object.keys(fileData).forEach(key => {
        if (fileData[key]) {
          formDataToSend.append(key, fileData[key]);
        }
      });
    }

    // Debugging: Log the form data being sent
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const endpoint = `http://localhost:5000/api/${isSignup ? 'signup' : 'login'}`;
      const response = await fetch(endpoint, { 
        method: 'POST', 
        body: formDataToSend 
      });

      console.log('Response Status:', response.status);
      const responseData = await response.json();
      console.log('Response Data:', responseData);

      if (response.ok) {
        if (isSignup) {
          alert('User signed up successfully!');
        } else {
          localStorage.setItem('jwtToken', responseData.token);
          if (typeof onLogin === 'function') {
            onLogin();
          }
          navigate('/welcome');
        }
      } else {
        alert(isSignup ? 'Error signing up.' : responseData.error || 'Invalid credentials.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <div
        ref={formRef}
        className={`bg-white p-8 rounded-lg shadow-lg w-full ${
          showEmergencyFields ? 'max-w-screen-lg' : 'max-w-screen-sm'
        } transition-all duration-300 ease-in-out`}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="prefill-emergency"
                  checked={showEmergencyFields}
                  onChange={() => setShowEmergencyFields(!showEmergencyFields)}
                  className="mr-2"
                />
                <label htmlFor="prefill-emergency" className="text-gray-600">
                  Prefill emergency details
                </label>
              </div>
              {showEmergencyFields && (
                <MedicalDetails
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                />
              )}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {isSignup && (
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300 w-full"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;


















