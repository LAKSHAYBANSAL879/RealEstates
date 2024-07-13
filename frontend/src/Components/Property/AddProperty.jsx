import React, { useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faCamera, faCar, faDumbbell, faEye, faLock, faParking, faShield, faShieldAlt, faWater } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const AddProperty = () => {
    const navigate=useNavigate();
    const {user}=useContext(UserContext);
  const [step, setStep] = useState(1);
  const steps = ["Property Details ","Location Details","Basic Ameneties","Price Details","Property Images"];
  const [formData, setFormData] = useState({
    propertyFor: "",
    propertyType: "",
    specificPropertyType: "",
    buildUpArea: "",
    carpetArea: "",
    propertyAge: "",
    floor: "",
    totalFloors: "",
    facing: "",
    bhk: "",
    toilets: "",
    balconies: "",
    tenantPreference: "",
    availability: "",
    description: "",
    society: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    nonVeg:"",
    pets:"",
    furnishing:"",
    features:[],
    amenities:[],
    rentAmount: "",
    rentDuration: "",
    maintenanceIncluded: false,
    maintenanceFee: "",
    preferredPaymentMode: "",
    basePrice: "",
    priceWithRegistration: "",
    photos: [],

  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox") {
      setFormData((prev) => {
        const currentArray = prev[name] || [];
        if (checked) {
         
          return {
            ...prev,
            [name]: [...currentArray, value],
          };
        } else {
          
          return {
            ...prev,
            [name]: currentArray.filter((item) => item !== value),
          };
        }
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };
  const handleRemovePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };
  const renderPhotos = () => (
    <div className="flex space-x-2 mt-4">
      {formData.photos.map((photo, index) => (
        <div key={index} className="relative">
          <img src={photo} alt={`Property ${index}`} className="w-20 h-20 object-cover rounded" />
          <button
            type="button"
            onClick={() => handleRemovePhoto(index)}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach(item => data.append(key, item));
      } else {
        data.append(key, formData[key]);
      }
    }

    data.append('userId', user?._id);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/property/addProperty',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      navigate(`/propertySuccess/${response.data._id}`);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.propertyFor)
        newErrors.propertyFor = "Property For is required";
      if (!formData.propertyType)
        newErrors.propertyType = "Property Type is required";
      if (!formData.buildUpArea)
        newErrors.buildUpArea = "Built Up Area is required";
      if (!formData.carpetArea)
        newErrors.carpetArea = "Carpet Area is required";
      if (!formData.propertyAge) newErrors.age = "Property Age is required";
      if (!formData.bhk) newErrors.bhkEroor = "Number of BHK is  required";
      if (!formData.toilets)
        newErrors.toiletsEroor = "Number of toilets is  required";
      if (!formData.floor) newErrors.floor = "Floor number is  required";
      if (!formData.totalFloors)
        newErrors.totalFloors = "Total number of floors is  required";
      if (!formData.facing) newErrors.facing = "Flat facing is  required";
      if (!formData.balconies)
        newErrors.balconies = "Number of balconies is  required";
      if (!formData.tenantPreference)
        newErrors.tenantPreference = "Tenant Preference is  required";
      if (!formData.availability)
        newErrors.availability = "Availability is  required";
      if (!formData.description)
        newErrors.description = "Property description is  required";

     
    }
    else if(step===2){
        if (!formData.society)
            newErrors.society = "Society/Building name is  required";
          if (!formData.area)
            newErrors.area = "Area is  required";
          if (!formData.landmark)
            newErrors.landmark = "Landmark is  required";
          if (!formData.city)
            newErrors.city = "City is  required";
          if (!formData.state)
            newErrors.state = "State is  required";
    }
else if(step===4){
    if (formData.propertyFor === "Rent") {
        if (!formData.rentAmount) newErrors.rentAmount = "Rent amount is required";
        if (!formData.rentDuration) newErrors.rentDuration = "Rent duration is required";
      } else if (formData.propertyFor === "Sale") {
        if (!formData.basePrice) newErrors.basePrice = "Base price is required";
        if (!formData.priceWithRegistration) newErrors.priceWithRegistration = "Price with registration is required";
      }
}
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderSpecificPropertyTypeDropdown = () => {
    switch (formData.propertyType) {
      case "Residential":
        return (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Specific Property Type <span className="text-red-500">*</span>:
            </label>
            <select
              name="specificPropertyType"
              value={formData.specificPropertyType}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select</option>
              <option value="Flat/Apartment">Flat / Apartment</option>
              <option value="House/Villa">House / Villa</option>
            </select>
            {errors.specificPropertyType && (
              <p className="text-red-500 text-xs italic">
                {errors.specificPropertyType}
              </p>
            )}
          </div>
        );
      case "Commercial":
        return (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Specific Property Type <span className="text-red-500">*</span>:
            </label>
            <select
              name="specificPropertyType"
              value={formData.specificPropertyType}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select</option>
              <option value="Office Space">Office Space</option>
              <option value="Co-working">Co-working</option>
              <option value="Shop/Showroom">Shop / Showroom</option>
              <option value="Industrial Building">Industrial Building</option>
              <option value="Industrial Shed">Industrial Shed</option>
              <option value="Warehouse/Godown">Warehouse / Godown</option>
              <option value="Restaurant/Cafe">Restaurant / Cafe</option>
            </select>
            {errors.specificPropertyType && (
              <p className="text-red-500 text-xs italic">
                {errors.specificPropertyType}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const renderRentFields = () => (
    <div className="custom overflow-y-auto border-2 border-black p-4">
      <div className='flex justify-evenly mb-4'>
        {steps.map((stepTitle, index) => (
          <div
            key={index}
            className={`p-2 px-4 w-1/5 h-24 font-light text-2xl text-wrap text-center cursor-pointer ${
              step === index + 1
                ? "bg-blue-500 text-white border-b-8 border-b-black"
                : "bg-gray-200 text-black border-b-8 border-b-gray-500"
            }`}
            onClick={() => setStep(index + 1)}
          >
            {stepTitle}
          </div>
        ))}
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rent Amount <span className="text-red-500">*</span>:
        </label>
        <input
          type="text"
          name="rentAmount"
          value={formData.rentAmount}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        {errors.rentAmount && <p className="text-red-500 text-xs italic">{errors.rentAmount}</p>}
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rent Duration <span className="text-red-500">*</span>:
        </label>
        <input
          type="text"
          name="rentDuration"
          value={formData.rentDuration}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        {errors.rentDuration && <p className="text-red-500 text-xs italic">{errors.rentDuration}</p>}
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Maintenance Included:
        </label>
        <div className="flex items-center">
          <input
            type="radio"
            name="maintenanceIncluded"
            value="yes"
            checked={formData.maintenanceIncluded === "yes"}
            onChange={() => setFormData({ ...formData, maintenanceIncluded: "yes" })}
            className="mr-2"
          />
          <label className="mr-4">Yes</label>
          <input
            type="radio"
            name="maintenanceIncluded"
            value="no"
            checked={formData.maintenanceIncluded === "no"}
            onChange={() => setFormData({ ...formData, maintenanceIncluded: "no" })}
            className="mr-2"
          />
          <label>No</label>
        </div>
      </div>
  
      {formData.maintenanceIncluded === "no" && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Maintenance Fee:
          </label>
          <input
            type="text"
            name="maintenanceFee"
            value={formData.maintenanceFee}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.maintenanceFee && <p className="text-red-500 text-xs italic">{errors.maintenanceFee}</p>}
        </div>
      )}
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Preferred Payment Mode <span className="text-red-500">*</span>:
        </label>
        <input
          type="text"
          name="preferredPaymentMode"
          value={formData.preferredPaymentMode}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        {errors.preferredPaymentMode && <p className="text-red-500 text-xs italic">{errors.preferredPaymentMode}</p>}
      </div>
      <button
              type="button"
              onClick={prevStep}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Prev
            </button>
      <button
        type="button"
        onClick={nextStep}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Next
      </button>
    </div>
  );

  const renderSaleFields = () => (
    <div className="custom overflow-y-auto border-2 border-black p-4">
        <div className='flex justify-evenly mb-4'>
              {steps.map((stepTitle, index) =>( 
                <div
                  key={index}
                  className={`p-2 px-4 w-1/5 h-24 font-light text-2xl text-wrap text-center cursor-pointer ${
                    step === index + 1
                      ? "bg-blue-500 text-white border-b-8 border-b-black"
                      : "bg-gray-200 text-black border-b-8 border-b-gray-500"
                  }`}
                  onClick={() => setStep(index + 1)}
                >
                  {stepTitle}
                </div>
              ))}
            </div>
            
      <div className="mb-4 ">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Base Price <span className="text-red-500">*</span>:
        </label>
        <input
          type="text"
          name="basePrice"
          value={formData.basePrice}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        {errors.basePrice && <p className="text-red-500 text-xs italic">{errors.basePrice}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price with Registration <span className="text-red-500">*</span>:
        </label>
        <input
          type="text"
          name="priceWithRegistration"
          value={formData.priceWithRegistration}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        {errors.priceWithRegistration && <p className="text-red-500 text-xs italic">{errors.priceWithRegistration}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Preferred Payment Mode <span className="text-red-500">*</span>:
        </label>
        <input
          type="text"
          name="preferredPaymentMode"
          value={formData.preferredPaymentMode}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        {errors.preferredPaymentMode && <p className="text-red-500 text-xs italic">{errors.preferredPaymentMode}</p>}
      </div>
      <button
              type="button"
              onClick={prevStep}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Prev
            </button>
      <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
    </div>
  );
  const renderStep5 = () => (
    <div className="custom overflow-y-auto border-2 border-black p-4">
       <div className='flex justify-evenly mb-4'>
              {steps.map((stepTitle, index) =>( 
                <div
                  key={index}
                  className={`p-2 px-4 w-1/5 h-24 font-light text-2xl text-wrap text-center cursor-pointer ${
                    step === index + 1
                      ? "bg-blue-500 text-white border-b-8 border-b-black"
                      : "bg-gray-200 text-black border-b-8 border-b-gray-500"
                  }`}
                  onClick={() => setStep(index + 1)}
                >
                  {stepTitle}
                </div>
              ))}
            </div>

      <div className="flex flex-col w-full mt-4">
        <label className="block text-gray-700 text-xl  text-left mb-2">Add Photos to attract more tenants / buyers</label>
        <label htmlFor="" className="font-semibold text-lg">Add Photos of living room, bedroom, bathroom, floor, doors, kitchen, balcony, location map, neighborhood, etc</label>
        <div className="border-dashed border-2 border-gray-400 w-full mt-3 h-40 flex items-center justify-center relative">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            className="absolute inset-0 opacity-0 cursor-pointer mx-auto"
          />
          <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-4xl" />
        </div>
        {renderPhotos()}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </div>
  );
 return (
    <div className="container p-4 mt-4 w-full  md:w-2/3 mx-auto my-auto  text-left">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="custom overflow-y-auto border-2 border-black p-4">
            <div className='flex justify-evenly mb-4'>
              {steps.map((stepTitle, index) =>( 
                <div
                  key={index}
                  className={`p-2 px-4 w-1/5 h-24 font-light text-2xl text-wrap text-center cursor-pointer ${
                    step === index + 1
                      ? "bg-blue-500 text-white border-b-8 border-b-black"
                      : "bg-gray-200 text-black border-b-8 border-b-gray-500"
                  }`}
                  onClick={() => setStep(index + 1)}
                >
                  {stepTitle}
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Property For <span className="text-red-500">*</span>:
              </label>
              <div className="flex flex-wrap gap-4">
                <label
                  className={`p-2 px-4 border-2 rounded-3xl border-gray-400 cursor-pointer ${
                    formData.propertyFor === "Rent"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="propertyFor"
                    value="Rent"
                    
                    onChange={handleChange}
                    className="mr-2 hidden"
                    required
                  />
                  Rent
                </label>
                <label
                  className={`p-2 px-4  border-2 rounded-3xl border-gray-400 cursor-pointer ${
                    formData.propertyFor === "Sale"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="propertyFor"
                    value="Sale"
                    onChange={handleChange}
                    className="mr-2 hidden"
                    required
                  />
                  Sale
                </label>
              </div>
              {errors.propertyFor && (
                <p className="text-red-500 text-xs italic">
                  {errors.propertyFor}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Property Type <span className="text-red-500">*</span>:
              </label>
              <div className="flex flex-wrap gap-4">
                {["Residential", "Commercial", "Land/Plot"].map((option) => (
                  <label
                    key={option}
                    className={`p-2 px-4 rounded-3xl border-2 border-gray-400 cursor-pointer ${
                      formData.propertyType === option
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="propertyType"
                      value={option}
                      onChange={handleChange}
                      className="mr-2 hidden"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.propertyType && (
                <p className="text-red-500 text-xs italic">
                  {errors.propertyType}
                </p>
              )}
            </div>
            {renderSpecificPropertyTypeDropdown()}
            <div className="flex w-full justify-between">
              <div className="mb-4 w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Built Up Area <span className="text-red-500">*</span>:
                </label>
                <input
                  type="number"
                  name="buildUpArea"
                  value={formData.buildUpArea}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.buildUpArea && (
                  <p className="text-red-500 text-xs italic">
                    {errors.buildUpArea}
                  </p>
                )}
              </div>
              <div className="mb-4 w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2 ">
                  Carpet Area <span className="text-red-500">*</span>:
                </label>
                <input
                  type="number"
                  name="carpetArea"
                  value={formData.carpetArea}
                  onChange={handleChange}
                  className="border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.carpetArea && (
                  <p className="text-red-500 text-xs italic">
                    {errors.carpetArea}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="mb-4 w-1/4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Property on Floor <span className="text-red-500">*</span>:
                </label>
                <input
                  type="number"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.floor && (
                  <p className="text-red-500 text-xs italic">{errors.floor}</p>
                )}
              </div>
              <div className="mb-4 w-1/4">
                <label className="block text-gray-700 text-sm font-bold mb-2 ">
                  Total floors <span className="text-red-500">*</span>:
                </label>
                <input
                  type="number"
                  name="totalFloors"
                  value={formData.totalFloors}
                  onChange={handleChange}
                  className="border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.totalFloors && (
                  <p className="text-red-500 text-xs italic">
                    {errors.totalFloors}
                  </p>
                )}
              </div>
              <div className="mb-4 w-1/4">
                <label className="block text-gray-700 text-sm font-bold mb-2 ">
                  Facing<span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  name="facing"
                  value={formData.facing}
                  onChange={handleChange}
                  className="border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.facing && (
                  <p className="text-red-500 text-xs italic">{errors.facing}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Property Age <span className="text-red-500">*</span>:
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  "Less than 1 Year",
                  "1 - 3 Years",
                  "3 - 5 Years",
                  "5 - 10 Years",
                  "Greater than 10 Years",
                ].map((option) => (
                  <label
                    key={option}
                    className={`p-2 rounded-3xl px-4 border-2 border-gray-400 cursor-pointer ${
                      formData.propertyAge === option
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="propertyAge"
                      value={option}
                      onChange={handleChange}
                      className="mr-2 hidden"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.propertyAge && (
                <p className="text-red-500 text-xs italic">
                  {errors.propertyAge}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                BHK type <span className="text-red-500">*</span>:
              </label>
              <div className="flex flex-wrap gap-4">
                {["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map(
                  (option) => (
                    <label
                      key={option}
                      className={`p-2 rounded-3xl px-4 border-2 border-gray-400 cursor-pointer ${
                        formData.bhk === option
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <input
                        type="radio"
                        name="bhk"
                        value={option}
                        onChange={handleChange}
                        className="mr-2 hidden"
                        required
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
              {errors.bhkEroor && (
                <p className="text-red-500 text-xs italic">{errors.bhkEroor}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bathroom / Toilets <span className="text-red-500">*</span>:
              </label>
              <div className="flex flex-wrap gap-4">
                {["1+1 ", "1 ", "2 ", "3 ", "4 ", "5+ "].map((option) => (
                  <label
                    key={option}
                    className={`p-2 rounded-3xl px-4 border-2 border-gray-400 cursor-pointer ${
                      formData.toilets === option
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="toilets"
                      value={option}
                      onChange={handleChange}
                      className="mr-2 hidden"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.toiletsEroor && (
                <p className="text-red-500 text-xs italic">
                  {errors.toiletsEroor}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Balconies <span className="text-red-500">*</span>:
              </label>
              <div className="flex flex-wrap gap-4">
                {["0 ", "1 ", "2 ", "3 ", "4 ", "5+ "].map((option) => (
                  <label
                    key={option}
                    className={`p-2 rounded-3xl px-4 border-2 border-gray-400 cursor-pointer ${
                      formData.balconies === option
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="balconies"
                      value={option}
                      onChange={handleChange}
                      className="mr-2 hidden"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.balconies && (
                <p className="text-red-500 text-xs italic">
                  {errors.balconies}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tenants Preference <span className="text-red-500">*</span>:
              </label>
              <div className="flex flex-wrap gap-4">
                {["Any ", "Family ", "Bachelor (MEN)", "Bachelor (WOMEN) "].map(
                  (option) => (
                    <label
                      key={option}
                      className={`p-2 rounded-3xl px-4 border-2 border-gray-400 cursor-pointer ${
                        formData.tenantPreference === option
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tenantPreference"
                        value={option}
                        onChange={handleChange}
                        className="mr-2 hidden"
                        required
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
              {errors.tenantPreference && (
                <p className="text-red-500 text-xs italic">
                  {errors.tenantPreference}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Availability<span className="text-red-500">*</span>:
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  "Immediate ",
                  "within 10 days ",
                  "within 1 month",
                  "within 2 months ",
                ].map((option) => (
                  <label
                    key={option}
                    className={`p-2 rounded-3xl px-4 border-2 border-gray-400 cursor-pointer ${
                      formData.availability === option
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="availability"
                      value={option}
                      onChange={handleChange}
                      className="mr-2 hidden"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.availability && (
                <p className="text-red-500 text-xs italic">
                  {errors.availability}
                </p>
              )}
            </div>
            <div className="mb-4 w-full p-2 ">
              <label className="block text-gray-700 text-sm font-bold mb-2 ">
                Property Description<span className="text-red-500">*</span>:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add a best description of your property to attract tenants"
                className="border w-full h-32 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.description && (
                <p className="text-red-500 text-xs italic">
                  {errors.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="custom overflow-y-auto border-2 border-black p-4">
           <div className='flex justify-evenly mb-4'>
              {steps.map((stepTitle, index) =>( 
                <div
                  key={index}
                  className={`p-2 px-4 w-1/5 h-24 font-light text-2xl text-wrap text-center cursor-pointer ${
                    step === index + 1
                      ? "bg-blue-500 text-white border-b-8 border-b-black"
                      : "bg-gray-200 text-black border-b-8 border-b-gray-500"
                  }`}
                  onClick={() => setStep(index + 1)}
                >
                  {stepTitle}
                </div>
              ))}
            </div>
            <div className="flex w-full justify-between">
            <div className="mb-4 w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2 ">
                 Building / Society <span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  name="society"
                  value={formData.society}
                  onChange={handleChange}
                  className="border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.society && (
                  <p className="text-red-500 text-xs italic">
                    {errors.society}
                  </p>
                )}
              </div>
              <div className="mb-4 w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2 ">
                  Area <span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.area && (
                  <p className="text-red-500 text-xs italic">
                    {errors.area}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full justify-between">
            <div className="mb-4 w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2 ">
                 Landmark <span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.landmark && (
                  <p className="text-red-500 text-xs italic">
                    {errors.landmark}
                  </p>
                )}
              </div>
              <div className="mb-4 w-1/4">
                <label className="block text-gray-700 text-sm font-bold mb-2 ">
                  City <span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.city && (
                  <p className="text-red-500 text-xs italic">
                    {errors.city}
                  </p>
                )}
              </div>
              <div className="mb-4 w-1/4">
                <label className="block text-gray-700 text-sm font-bold mb-2 ">
                  State <span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {errors.state && (
                  <p className="text-red-500 text-xs italic">
                    {errors.state}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.087233229559!2d72.8686909148984!3d19.278572323820985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b05b48245db7%3A0x888d281fe22f3532!2sGokul%20Village%20CHS%202!5e0!3m2!1sen!2sin!4v1720779859123!5m2!1sen!2sin" 
        width="920" 
        height="300" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
</div>
<button
              type="button"
              onClick={prevStep}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Next
            </button>
            
          </div>
        )}
         {step === 3 && (
          <div className="custom overflow-y-auto border-2 border-black p-4">
           <div className='flex justify-evenly mb-4'>
              {steps.map((stepTitle, index) =>( 
                <div
                  key={index}
                  className={`p-2 px-4 w-1/5 h-24 font-light text-2xl text-wrap text-center cursor-pointer ${
                    step === index + 1
                      ? "bg-blue-500 text-white border-b-8 border-b-black"
                      : "bg-gray-200 text-black border-b-8 border-b-gray-500"
                  }`}
                  onClick={() => setStep(index + 1)}
                >
                  {stepTitle}
                </div>
              ))}
            </div>
           <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Non  Veg Allowed :
  </label>
  <div className="flex flex-wrap gap-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="nonVeg"
        value="Yes"
        onChange={handleChange}
        className="mr-2"
      />
      Yes Allowed
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="nonVeg"
        value="No"
        onChange={handleChange}
        className="mr-2"
      />
      Not Allowed
    </label>
  </div>
  
</div>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Pets Allowed :
  </label>
  <div className="flex flex-wrap gap-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="pets"
        value="Yes"
        onChange={handleChange}
        className="mr-2"
      />
      Yes 
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="pets"
        value="No"
        onChange={handleChange}
        className="mr-2"
      />
      No
    </label>
  </div>
  
</div>      
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Furnishing status
  </label>
  <div className="flex flex-wrap gap-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="furnishing"
        value="full"
        onChange={handleChange}
        className="mr-2"
      />
      Fullly Furnished
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="furnished"
        value="semi"
        onChange={handleChange}
        className="mr-2"
      />
      Semi Furnished
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="furnished"
        value="not"
        onChange={handleChange}
        className="mr-2"
      />
      Unfurnished
    </label>
  </div>
  
</div> 
<div className="mb-4">
  <label className="block text-gray-700  font-bold mb-2 text-xl">
    Additional Features:
  </label>
  <div className="flex flex-wrap gap-4">
    {["AC", "Refrigerator", "Oven","Washing machine","Microwave"].map((feature) => (
      <label key={feature} className="flex items-center text-lg">
        <input
          type="checkbox"
          name="features"
          value={feature.toLowerCase()}
          onChange={handleChange}
          checked={formData.features.includes(feature.toLowerCase())}
          className="mr-2"
        />
        {feature}
      </label>
    ))}
  </div>
</div>
<div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 text-xl">Basic Amenities:</label>
          <div className="flex flex-wrap gap-16  align-middle ">
            {[
              { name: "24/7 Security", icon: faShield },
              { name: "CCTV cameras", icon: faEye },
              { name: "Parking", icon: faCar },
              { name: "Regular Water supply", icon: faWater },
              { name: "Regular Electricity supply", icon: faBolt },
              { name: "Gym", icon: faDumbbell },


            ].map(({ name, icon }) => (
              <label key={name} className="flex flex-col items-center text-base">
               
                <FontAwesomeIcon icon={icon} className="mr-2" />
                {name}
                <input
                  type="checkbox"
                  name="amenities"
                  value={name.toLowerCase()}
                  onChange={handleChange}
                  className="mr-2"
                  checked={formData.amenities.includes(name.toLowerCase())}
                />
              </label>
            ))}
          </div>
        </div>
        <button
              type="button"
              onClick={prevStep}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Next
            </button>
            
          </div>
        )}
       {step === 4 && (
  <>
    {(formData.propertyFor === "Rent" || !formData.propertyFor) && renderRentFields()}
    {formData.propertyFor === "Sale" && renderSaleFields()}
  </>
)}
      {step === 5 && renderStep5()}

      </form>
    </div>
  );
};

export default AddProperty;
