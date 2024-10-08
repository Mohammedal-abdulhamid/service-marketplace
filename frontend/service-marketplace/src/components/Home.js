

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Helper function to render stars
const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`inline-block ${i < rating ? 'text-yellow-500' : 'text-gray-400'}`}>
        ★
      </span>
    );
  }
  return stars;
};



const Home = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch services from the backend API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3001');
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
//  colorfull status dot
  const getStatusDotColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'not Available':
        return 'bg-yellow-500';
      case 'not urgent':
        return 'bg-blue-500';
      case 'urgent':
        return 'bg-red-500';
      default:
        return 'bg-gray-500'; 
    }
  };

  // Filter services based on search term
  const filteredServices = services.filter((service) =>
    service.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
       {/* Search Bar */}
       <div className="max-w-lg mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for a service..."
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <Link to="/providers">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          I’m a Service Provider
        </button>
        </Link>
         <Link to="/seekers">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          I’m Looking for a Service
        </button>
        </Link>
      </div>

     

      {/* Service Listings */}
      {/* <Link to="/:id"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Link to={`/${service.serial_number}`} key={service.serial_number}>
            <div key={service.id} className="bg-white shadow-md p-4 rounded-lg">
              <div class="flex justify-between">
                
               <h3 className="text-xl font-bold">{service.name}</h3>
        
               <div className="flex items-center mt-2">
              <span
                className={`h-3 w-3 rounded-full inline-block mr-2 ${getStatusDotColor(service.status)}`}
              ></span>
              <span className="text-gray-700">{service.status}</span>
            </div>

              </div>
              <p className="text-gray-600">{service.job}</p>
              <p className="text-gray-600">{service.details}</p>
              <p className="text-gray-600"> Location: {service.location}</p>
              <div className="mt-2">
                  {renderStars(service.average_rating || 0)} {/* Average rating from backend */}
                </div>
              
            </div>
            </Link>
           
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No services found for "{searchTerm}"
          </div>
        )}
      </div>
      {/* </Link> */}
    </div>
    
  );
};

export default Home;
