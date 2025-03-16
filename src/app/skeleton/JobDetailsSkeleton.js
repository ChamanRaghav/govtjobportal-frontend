const JobDetailsSkeleton = () => {
    return (
      <div className="w-full p-4 overflow-y-auto">
        <div className="bg-white p-6 shadow-md rounded-lg animate-pulse">
          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
  
          {/* Organization & URL */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/4 bg-blue-300 rounded"></div>
          </div>
  
          {/* Location */}
          <div className="h-4 w-1/4 bg-gray-300 rounded mb-4"></div>
  
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <div className="h-10 w-40 bg-gray-300 rounded"></div>
            <div className="h-10 w-40 bg-blue-400 rounded"></div>
          </div>
  
          {/* Qualification */}
          <div className="h-4 w-2/3 bg-gray-300 rounded mt-6 mb-4"></div>
  
          {/* Short Description */}
          <div className="h-16 w-full bg-gray-200 rounded mb-6"></div>
  
          {/* Vacancy & Last Date */}
          <div className="flex justify-between">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
          </div>
  
          {/* Notification Iframe Placeholder */}
          <div className="mt-6 h-[90vh] bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  };
  
  export default JobDetailsSkeleton;
  