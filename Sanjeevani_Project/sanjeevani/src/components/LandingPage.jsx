import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hospital, Bed, Ambulance, Stethoscope, Clock, Filter, Search } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Sanjeevani</div>
          <div className="space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Services</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</a>
            <button
              onClick={handleLoginClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in-up">Your Health, Our Priority</h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in-up animation-delay-300">Find the best healthcare services near you with real-time updates and easy appointment booking.</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-colors duration-300 animate-fade-in-up animation-delay-600">Get Started</button>
        </section>

        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={<Hospital className="w-12 h-12 text-blue-600" />} title="Hospital Finder" description="Locate nearby hospitals based on your location and preferences." />
            <FeatureCard icon={<Clock className="w-12 h-12 text-blue-600" />} title="Live OPD Queue" description="Get real-time updates on OPD waiting times and book appointments efficiently." />
            <FeatureCard icon={<Bed className="w-12 h-12 text-blue-600" />} title="Bed Availability" description="Check the number of available beds in hospitals in real-time." />
            <FeatureCard icon={<Ambulance className="w-12 h-12 text-blue-600" />} title="Ambulance Tracking" description="Track available ambulances and their current status." />
            <FeatureCard icon={<Stethoscope className="w-12 h-12 text-blue-600" />} title="Doctor Directory" description="Browse through a list of doctors, their specializations, and success rates." />
            <FeatureCard icon={<Filter className="w-12 h-12 text-blue-600" />} title="Advanced Filtering" description="Filter hospitals based on various criteria to find the perfect match." />
          </div>
        </section>

        <section className="bg-blue-600 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Ready to find the best healthcare?</h2>
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center bg-white rounded-full overflow-hidden">
                <Search className="w-6 h-6 text-gray-400 ml-4" />
                <input type="text" placeholder="Enter your location" className="w-full py-3 px-4 focus:outline-none" />
                <button className="bg-blue-700 text-white px-6 py-3 hover:bg-blue-800 transition-colors duration-300">Search</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; Sanjeevani</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;
