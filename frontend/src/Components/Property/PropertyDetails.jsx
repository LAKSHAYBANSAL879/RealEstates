import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faEdit, faBed, faToilet, faBathtub, faAreaChart, faBuilding, faCompass, faCouch, faPeopleGroup, faCalendarCheck, faPaw, faFish, faRupeeSign, faPhone } from '@fortawesome/free-solid-svg-icons';
import fake from "../../Images/frame.png";
import { UserContext } from '../../UserContext';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/property/properties/${id}`);
        setProperty(response.data);
        setFormData({ ...response.data });
      } catch (error) {
        console.error('There was an error fetching the property!', error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(property);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      newPhotos: files,
    }));
  };

  const handleRemovePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveNewPhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      newPhotos: (prev.newPhotos || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === 'newPhotos') {
        for (const file of formData[key]) {
          data.append('photos', file);
        }
      } else if (key !== 'photos') {
        data.append(key, formData[key]);
      }
    }

    try {
      await axios.put(`http://localhost:8080/api/v1/property/editProperties/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProperty(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('There was an error updating the property!', error);
    }
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container p-4 mt-4">
      <div className="flex flex-col lg:flex-row w-full mx-auto">
        <div className="flex flex-col lg:w-2/3">
          <h1 className="font-bold text-xl text-left ml-4">
            {property.bhk}  {property.specificPropertyType} for {property.propertyFor} in {property.society} {property.area} ({property.buildUpArea} Sqft)
          </h1>
          <div className="flex justify-between flex-col md:flex-row">
            <div>
              <h1 className="text-left ml-4">
                <FontAwesomeIcon icon={faLocationPin} className="mr-4" />
                {property.area}, {property.city}, {property.state}
              </h1>
            </div>
            <div className='flex gap-3 mt-4 md:mt-0'>
              <button onClick={handleEditClick} className="rounded">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <img src={fake} alt="" className="w-16 mr-4" />
            </div>
          </div>
          <div className="mt-4">
            <Carousel showThumbs={false}>
              {formData.photos.map((photo, index) => (
                <div key={index}>
                  <img src={`http://localhost:8080/api/v1/property/uploadsss/${photo}`} alt={`Property ${index}`} className='h-96' />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </Carousel>
          </div>
          <div className='border-2 border-gray-200 w-full lg:w-3/4 p-4 mt-5'>
            <div className='flex justify-between'>
              <h1 className='font-bold text-3xl font-mono text-left mb-3'>Property Overview</h1>
              <p className='font-bold text-gray-400'>Society: {property.society}</p>
            </div>
            <div className='flex flex-wrap gap-8 text-left px-8 mx-auto'>
              {[
                { icon: faBed, value: property.bhk, label: 'Bedrooms' },
                { icon: faBathtub, value: property.toilets, label: 'Bathrooms' },
                { icon: faAreaChart, value: `${property.buildUpArea} Sqft`, label: 'Area' },
                { icon: faBuilding, value: property.floor, label: 'Floor' },
                { icon: faBuilding, value: property.totalFloors, label: 'Total Floors' },
                { icon: faCompass, value: property.facing, label: 'Facing' },
                { icon: faBuilding, value: property.balconies, label: 'Balcony' },
                { icon: faCouch, value: `${property.furnishing} Furnished`, label: 'Furnishing' },
                { icon: faPeopleGroup, value: property.tenantPreference, label: 'Tenant Preference' },
                { icon: faCalendarCheck, value: property.availability, label: 'Availability' },
                { icon: faPaw, value: property.pets, label: 'Pets Allowed' },
                { icon: faFish, value: property.nonVeg, label: 'Non Veg Allowed' },
                { icon: faBuilding, value: property.propertyAge, label: 'Property Age' },
              ].map((item, index) => (
                <div className='flex flex-row' key={index}>
                  <FontAwesomeIcon icon={item.icon} />
                  <div className='flex flex-col pl-3'>
                    <h1 className='font-bold'>{item.value}</h1>
                    <h1 className='font-bold text-gray-400'>{item.label}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='w-full lg:w-3/4 mt-2 border-2 text-left p-4'>
            <h1 className='font-bold text-3xl font-mono mb-2'>Description</h1>
            <h1 className='font-bold text-gray-400'>{property.description}</h1>
          </div>
        </div>
        <div className="w-full lg:w-1/4 h-fit mt-8 lg:mt-0 lg:ml-16 bg-orange-50 flex flex-col">
          <div className='bg-orange-100 p-4 text-left'>
            <h1 className='font-bold text-2xl'><FontAwesomeIcon icon={faRupeeSign}/> {property.basePrice || property.rentAmount} only</h1>
          </div>
          <div className='flex flex-col text-left ml-5 p-3 gap-5'>
            <h1 className='font-bold text-xl'>Send an Inquiry for this property?</h1>
            <h1>Contact Person : Melvin Lasrado</h1>
            <h1 className='bg-white font-bold text-lg p-3'><FontAwesomeIcon icon={faPhone}/>+91-9999999999</h1>
            <form action="" className='flex flex-col gap-4 w-full'>
              <input type="text" placeholder='Name' className='bg-white p-4'/>
              <input type="email" placeholder='Email' className='bg-white p-4' />
              <input type="tel" placeholder='Phone' className='bg-white p-4'/>
              <textarea name="message" id="message" cols="30" rows="10" className='bg-white p-4' placeholder='Message'/>
              <button className='bg-orange-500 text-white w-3/4 mx-auto p-3 font-bold'>Send Inquiry</button>
            </form>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="w-full lg:w-2/3 mx-auto mt-8">
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor="newPhotos">Add new photos:</label>
              <input type="file" id="newPhotos" name="newPhotos" onChange={handlePhotoChange} multiple />
              <div className="grid grid-cols-3 gap-4">
                {(formData.newPhotos || []).map((photo, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(photo)} alt={`New Property ${index}`} className="h-32 w-32 object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewPhoto(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {[
              { label: 'BHK', name: 'bhk', type: 'text' },
              { label: 'Specific Property Type', name: 'specificPropertyType', type: 'text' },
              { label: 'Property For', name: 'propertyFor', type: 'text' },
              { label: 'Area', name: 'area', type: 'text' },
              { label: 'Build Up Area', name: 'buildUpArea', type: 'number' },
              { label: 'City', name: 'city', type: 'text' },
              { label: 'State', name: 'state', type: 'text' },
              { label: 'Toilets', name: 'toilets', type: 'number' },
              { label: 'Floor', name: 'floor', type: 'number' },
              { label: 'Total Floors', name: 'totalFloors', type: 'number' },
              { label: 'Facing', name: 'facing', type: 'text' },
              { label: 'Balconies', name: 'balconies', type: 'number' },
              { label: 'Furnishing', name: 'furnishing', type: 'text' },
              { label: 'Tenant Preference', name: 'tenantPreference', type: 'text' },
              { label: 'Availability', name: 'availability', type: 'text' },
              { label: 'Pets Allowed', name: 'pets', type: 'text' },
              { label: 'Non Veg Allowed', name: 'nonVeg', type: 'text' },
              { label: 'Property Age', name: 'propertyAge', type: 'text' },
              { label: 'Description', name: 'description', type: 'textarea' },
            ].map((field, index) => (
              <div className="mb-4" key={index}>
                <label className="block mb-2">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="4"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                )}
              </div>
            ))}
            <div className="flex gap-4">
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
              <button type="button" onClick={handleCancelClick} className="bg-red-500 text-white p-2 rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
