import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="mb-4 relative overflow-hidden group md:flex-1"
        >
          <div className="relative h-80 w-10/12 bg-gray-300 animate-pulse" />
          <div className="relative bottom-0 left-0 md:w-1/2 right-0 p-4 bg-transparent">
            <div className="bg-gray-300 h-4 w-1/3  mb-2 animate-pulse" />
            <div className="bg-gray-300 h-4 w-2/3 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
