import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Sanjeevani</h1>
      <p className="text-lg text-gray-600 mb-8">
        We're glad to have you here. Explore our services and manage your profile from the button above.
      </p>
      <button
        onClick={handleProfileClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Go to Profile
      </button>
    </div>
  );
};

export default WelcomePage;