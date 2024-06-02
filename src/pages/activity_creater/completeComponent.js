import React from "react";

function CompleteComponent() {
  return (
    <div className="flex justify-center items-start">
      <div className="flex flex-row space-x-6 p-2">
        <div className="w-96 h-80 bg-gray-300 shadow-md rounded-[10px]"></div>
        <div className="bg-white p-6 shadow-md">
          <p className="text-gray-700 text-base mb-4 w-100">
            Story text Story text Story text Story text Story text Story text
            Story text Story text Story text Story text
          </p>
          <p className="text-gray-700 text-base font-bold">Author: Peter</p>
        </div>
      </div>
    </div>
  );
}

export default CompleteComponent;
