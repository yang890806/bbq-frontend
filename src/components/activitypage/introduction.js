import React from "react";

function Introduction() {
  return (
    <div className="flex items-center space-x-6 mb-10">
      <img
        src="https://i.pinimg.com/736x/d9/9d/92/d99d920205b664c8ccb672b2c6fdf107.jpg"
        alt="替代文字"
        className="bg-gray-300 shadow-sm h-40 w-32 rounded-[10px] min-h-[10rem] min-w-[8rem] max-h-[10rem] max-w-[8rem]"
      />
      <div>
        <h1 className="text-lg font-semibold">Book Name</h1>
        <p className="text-gray-500">author (目前所有的作者)</p>
        <p className="text-sm text-gray-600 mt-2">
          A student template for teachers to use introduce Book Creator to
          middle school students. This is part of the Teach your first Lesson
          library.
        </p>
      </div>
    </div>
  );
}

export default Introduction;
