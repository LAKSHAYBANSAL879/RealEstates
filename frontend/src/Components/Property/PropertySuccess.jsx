import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PropertySuccess = () => {
  const navigate = useNavigate();
  const { id: propertyId } = useParams(); 

  return (
    <div className="container p-4 mt-4 text-center  box">
      <h1 className="text-2xl font-bold mb-4">Property Added Successfully!</h1>
      <p className="mb-6">Your property has been added to the listings. You can now edit the details or preview the property.</p>
      
      <div className="flex justify-center gap-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => navigate(`/property/${propertyId}`)}
        >
          Edit Responses
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => navigate(`/property/${propertyId}`)}
        >
          Preview Property
        </button>
      </div>
    </div>
  );
};

export default PropertySuccess;
