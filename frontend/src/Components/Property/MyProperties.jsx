import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';

const MyProperties = () => {
  const { user } = useContext(UserContext);
  const [allProperties, setAllProperties] = useState([]);
  const [myProperties, setMyProperties] = useState([]);

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/property/allProperties');
        setAllProperties(response.data);
      } catch (error) {
        console.error('There was an error fetching all properties!', error);
      }
    };

    fetchAllProperties();
  }, []);

  useEffect(() => {
    if ( allProperties.length > 0) {
      const filteredProperties = allProperties.filter(property => property.userId === user._id);
      setMyProperties(filteredProperties);
    }
  }, [user, allProperties]);

  return (
    <div className="container p-4 mt-4">
      <h2 className='text-2xl font-bold font-mono m-2'> My Listed Properties</h2>
      <div className="flex flex-col w-full gap-4">
        {myProperties.map((property) => (
          <Link to={`/property/${property._id}`} key={property._id} className="border p-4 flex flex-row">
            <div className='w-1/4'>
              {property.photos && property.photos.length > 0 ? (
                <img
                  src={`http://localhost:8080/api/v1/property/uploadsss/${property.photos[0]}`}
                  alt="Property"
                  className=" h-48 object-cover mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
                  No Image Available
                </div>
              )}
            </div>
            <div className='flex flex-col w-1/2'>
              <h1 className='font-bold text-xl text-left ml-4'>{property.bhk}  {property.specificPropertyType} for {property.propertyFor} in {property.society} {property.area} ({property.buildUpArea} Sqft)</h1>
              <h1 className='text-left ml-4'><FontAwesomeIcon icon={faLocationPin} className='mr-4' />{property.area} ,{property.city} ,{property.state}</h1>
              <p className='text-left ml-4'>{property.description}</p>
            </div>
            <div className='w-1/4 flex flex-col'>
              <h1 className='font-bold text-xl text-right'>{property.basePrice || property.rentAmount} Rs</h1>
              <ul className='list-disc list-inside text-right'>
                {property.amenities && property.amenities.map((amenity) => (
                  <li key={amenity} className='text-sm text-gray-700'>
                    {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
