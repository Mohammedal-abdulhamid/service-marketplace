import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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


const ServiceDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch service details from the backend
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/service/${id}`);
        if (!response.ok) {
          throw new Error('Service not found');
        }
        const data = await response.json();
        setService(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setLoading(false);
      }
    };

    fetchServiceDetails(); // Call the function when the component mounts
  }, [id]);

  // Handle the "Contact Me" button click
  const handleContact = () => {
    if (service && service.email) {
      window.location.href = `mailto:${service.email}?subject=Interested in your ${service.name} service&body=Hi, I am interested in your ${service.name} service. Please contact me.`;
    }
  };

  // Handle the "Make a Payment" button click
  const handlePayment = () => {
    alert('Redirecting to payment portal...');
    // Integrate your payment gateway logic here (e.g., Stripe or PayPal)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    
    <div className="min-h-screen bg-gray-100 p-4">
      <Link to="/">
            <button className="bg-white shadow-md pl-3 pr-3 pt-2 pb-2 rounded-lg text-gray-800 hover:bg-gray-200">
              Home
            </button>
       </Link>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
        <p className="text-gray-600 mb-4"><strong>Job:</strong> {service.job}</p>
        <p className="text-gray-600 mb-4">{service.details}</p>
        <p className="text-gray-600 mb-4"><strong>Location:</strong> {service.location}</p>
       
        <div className="m-2">
                  {renderStars(service.average_rating || 0)} 
        </div>

        {/* Contact Me Button */}
        <button
          onClick={handleContact}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-700"
        >
          Contact Me
        </button>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white py-2 px-4 rounded mb-4 hover:bg-green-700 ml-4"
        >
          Make a Payment
        </button>

        {/* Reviews Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
          {service.reviews && service.reviews.length > 0 ? (
            <ul className="space-y-4">
              {service.reviews.map((review, index) => (
                <li key={index} className="border-b py-2">
                  <p>{review.text}</p>
                  <p className="text-sm text-gray-500">- {review.reviewer}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
