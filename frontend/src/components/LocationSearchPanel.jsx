import React from "react";

const LocationSearchPanel = (props) => {
  // sample array for location
  const locations = [
    "14A, Near Joshi's Cafe, Futala Lake Road, Nagpur",
    "16B, Beside Sharma Tea Point, Sitabuldi Market, Nagpur",
    "18C, Opposite Deshpande Sweets, Dharampeth Extension, Nagpur",
    "20D, Near Kale Book Store, Laxmi Nagar Square, Nagpur",
  ];

  return (
    <div>
      {/* this is just a sample data  */}
      {locations.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
