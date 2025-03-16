const SkeletonLoader = () => {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Filters and Search Bar Skeleton */}
        <div className="flex justify-between py-4 px-6 bg-blue-500 shadow-md">
          <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-full max-w-lg flex items-center gap-3 p-3 bg-gray-200 rounded-lg animate-pulse">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <div className="w-full h-4 bg-gray-400 rounded"></div>
          </div>
        </div>
  
        <div className="flex h-full">
          {/* Left Panel - Job List Skeleton */}
          <div className="w-1/3 p-4 shadow-lg overflow-y-auto">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="border p-4 my-2 rounded-lg bg-white shadow-sm animate-pulse">
                <div className="h-5 bg-gray-400 w-3/4 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 w-1/2 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
              </div>
            ))}
          </div>
  
          {/* Right Panel - Job Details Skeleton */}
          <div className="w-2/3 p-4">
            <div className="bg-white p-6 shadow-md rounded-lg animate-pulse">
              <div className="h-6 bg-gray-400 w-2/3 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 w-1/3 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/4 rounded mb-2"></div>
              <div className="h-32 bg-gray-200 w-full rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-10 w-32 bg-gray-400 rounded"></div>
                <div className="h-10 w-40 bg-blue-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  