import React, { useContext, useState } from "react";
import axios from "axios";
import "./Style.css";
import tick from "../../Images/tick.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(response.data.user);
      navigate("/home");
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      console.log(token);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="flex bg-blue-900 text-white font-mono overflow-y-hidden customes">
      <div className="w-full flex flex-col p-4">
        <div className="flex flex-col text-left m-2 p-3">
          <h1 className="text-4xl font-bold">Sell or Rent your Property For Free</h1>
          <p className="mt-2 text-lg">
            Whether you’re ready to sell or looking for answers, we’ll guide you
            with data and expertise specific to your <br /> needs.
          </p>
        </div>

        <div className="flex flex-row">
          <div className="w-1/2 flex flex-col gap-2 align-middle ml-24 mt-12 text-left">
            <h1 className="font-semibold text-xl">Upload your property in 4 simple steps</h1>
            <p className="flex flex-row">
              <img src={tick} alt="" className="w-8" />
              <span className="mt-2">Add your properties <span className="font-bold pl-2">Basic Details</span></span>
            </p>
            <p className="flex flex-row">
              <img src={tick} alt="" className="w-8" />
              <span className="mt-2">Add your properties <span className="font-bold pl-2">Location</span></span>
            </p>
            <p className="flex flex-row">
              <img src={tick} alt="" className="w-8" />
              <span className="mt-2">Add your properties <span className="font-bold pl-2">Features and Amenities</span></span>
            </p>
            <p className="flex flex-row">
              <img src={tick} alt="" className="w-8" />
              <span className="mt-2">Add <span className="font-bold pl-2">Price Details</span></span>
            </p>
            <p className="flex flex-row">
              <img src={tick} alt="" className="w-8" />
              <span className="mt-2">Add your property <span className="font-bold pl-2">Best Shots</span></span>
            </p>
          </div>
          <div className="w-1/2 my-auto p-8 text-black">
            <div className="w-3/4 h-64 border-2 border-black rounded-xl bg-white overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4 bg-gray-200 text-left pl-3 py-2 text-black">
                LETS GET YOU STARTED !
              </h2>
              <div className="h-full space-y-2 pb-3">
                <form onSubmit={handleSubmit} className="space-y-4 mb-3 pb-3 p-3">
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
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md"
                  >
                    Login
                  </button>
                </form>
                <p className="text-center text-sm text-gray-500">
                  First time user?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-lg leading-6 text-blue-600 hover:text-blue-500"
                  >
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
