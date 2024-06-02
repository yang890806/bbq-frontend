import React, { useState } from "react";

function VotingComponent() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  return (
    <div className="container mx-auto px-4">
      <div
        className="flex overflow-x-auto pt-8 pb-4 -mx-4"
        style={{ scrollbarWidth: "thin" }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            className={`flex-none w-full sm:w-auto md:w-1/4 px-1 py-1 mx-2 rounded-lg ${
              selectedItemIndex === index ? "bg-orange-300" : ""
            } hover:bg-orange-300`}
            key={index}
            style={{ minWidth: "300px" }}
            onClick={() => handleItemClick(index)}
          >
            <div className="bg-white p-6 rounded-lg shadow-md card-container ">
              <img
                src="https://i.pinimg.com/564x/d6/1e/13/d61e13f79b6dc217d4a20bc665701271.jpg"
                alt={`Placeholder image with grey background and dimension of 300x200 pixels for story ${
                  index + 1
                }`}
                className="w-full h-48 mb-2 rounded"
              />
              <h5 className="text-gray-900 text-xl leading-tight mb-2">
                By. author
              </h5>
              <p className="text-gray-600">Story Content bla bla bla ....</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <button className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
          投票
        </button>
      </div>
    </div>
  );
}

export default VotingComponent;
