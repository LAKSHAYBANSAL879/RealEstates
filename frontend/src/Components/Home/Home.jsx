import React from "react";
import tick from "../../Images/tick.png";
import main from "../../Images/main1.jpeg";

const Home = () => {
  return (
    <div className="bg-blue-900 text-white font-mono h-screen overflow-y-auto">
      <div className="w-full flex flex-col p-4">
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
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <img src={main} alt="" className="md:w-11/12 h-auto mr-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
