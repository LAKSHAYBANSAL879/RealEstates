import React, { useState } from "react";
import axios from "axios";
import "./Style.css";
import tick from "../../Images/tick.png";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("owner");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    profileImageUrl: null,
    builderFirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImageUrl: e.target.files[0],
    });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate('/login');
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row bg-blue-900 text-white font-mono overflow-y-hidden">
      <div className="w-full lg:w-1/2 flex flex-col p-4">
        <div className="flex flex-col text-left m-2 p-3">
          <h1 className="text-4xl font-bold">Sell or Rent your Property For Free</h1>
          <p className="mt-2 text-lg">
            Whether you’re ready to sell or looking for answers, we’ll guide you with data and expertise specific to your <br className="hidden md:inline" /> needs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex flex-col gap-2 align-middle lg:ml-24 mt-12 text-left">
            <h1 className="font-semibold text-xl">Upload your property in 4 simple steps</h1>
            <p className="flex flex-row items-center">
              <img src={tick} alt="" className="w-8" />
              <span className="mt-2 ml-2">Add your properties <span className="font-bold">Basic Details</span></span>
            </p>
            <p className="flex flex-row items-center">
              <img src={tick} alt="" className="w-8" />
              <span className="mt-2 ml-2">Add your properties <span className="font-bold">Location</span></span>
            </p>
            <p className="flex flex-row items-center">
              <img src={tick} alt="" className="w-8" />
              <span className="mt-2 ml-2">Add your properties <span className="font-bold">Features and Amenities</span></span>
            </p>
            <p className="flex flex-row items-center">
              <img src={tick} alt="" className="w-8" />
              <span className="mt-2 ml-2">Add <span className="font-bold">Price Details</span></span>
            </p>
            <p className="flex flex-row items-center">
              <img src={tick} alt="" className="w-8" />
              <span className="mt-2 ml-2">Add your property <span className="font-bold">Best Shots</span></span>
            </p>
          </div>
          </div>
          </div>
          <div className="w-1/2 my-auto p-8 text-black">
            <div className="w-full lg:w-3/4 h-auto lg:h-96 border-2 border-black rounded-xl bg-white overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4 bg-gray-200 text-left pl-3 py-2 text-black">
                LETS GET YOU STARTED !
              </h2>
              <div className="h-full space-y-2 pb-3">
                <form onSubmit={handleSubmit} className="space-y-4 mb-3 pb-3 p-3">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="owner"
                        checked={role === "owner"}
                        onChange={handleRoleChange}
                        className="form-radio"
                      />
                      <span className="ml-2">Owner</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="builder"
                        checked={role === "builder"}
                        onChange={handleRoleChange}
                        className="form-radio"
                      />
                      <span className="ml-2">Builder</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input
                      type="file"
                      name="profileImageUrl"
                      onChange={handleFileChange}
                      className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                    />
                  </div>
                  {role === "owner" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                      />
                    </div>
                  )}
                  {role === "builder" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Builder Firm</label>
                      <input
                        type="text"
                        name="builderFirm"
                        value={formData.builderFirm}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md"
                  >
                    Sign Up
                  </button>
                </form>
                <p className="text-center text-sm text-gray-500">
                  Already registered?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-lg leading-6 text-blue-600 hover:text-blue-500"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      
    
  );
};

export default Signup;
