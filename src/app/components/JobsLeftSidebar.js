import React from 'react'

function JobsLeftSidebar({jobs = [], selectedJob = {}, setSelectedJob = () => {}, loading=false, lastJobElementRef}) {
    return (
        <div className='w-1/3  shadow-lg p-4 overflow-y-auto'>
            {jobs.map((job, index) => (
                <div
                    key={index}
                    ref={index === jobs.length - 1 ? lastJobElementRef : null}
                    className={`job-card job-card:hover border p-4 my-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-pointer  hover:border-blue-500 ${selectedJob?._id == job._id
                            ? 'border-blue-500 bg-blue-50'
                            : 'bg-white hover:bg-gray-100 border-gray-300'
                        }`}
                    onClick={() => {
                        scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                        setSelectedJob(job);
                    }}
                    role='button'
                >
                    {/* Job Title */}
                    <h3 className='font-semibold text-lg text-gray-800 break-words flex justify-between items-center'>
                        <span>{job.title}</span>
                        {job.totalVacancies && (
                            <span className='text-sm font-medium text-gray-600'>
                                {job.totalVacancies} Posts
                            </span>
                        )}
                    </h3>

                    {/* Organization & Category */}
                    <p className='text-sm text-gray-700 mt-1'>
                        <strong className='text-gray-900'>{job.organization}</strong>
                        {job.advtNo !== '–' && ` - ${job.advtNo}`}
                        {job.jobCategory && <span>, {job.jobCategory}</span>}
                    </p>

                    {/* Dates Section */}
                    <div className='flex justify-between items-center mt-2 text-xs text-gray-600'>
                        <p>
                            Application Started:{' '}
                            <strong className='text-gray-800'>
                                {new Date(job.datePosted).toLocaleDateString()}
                            </strong>
                        </p>
                        <p className='text-red-500 font-semibold'>
                            Last Date:{' '}
                            <strong>
                                {new Date(job.applicationLastDate).toLocaleDateString()}
                            </strong>
                        </p>
                    </div>
                </div>
            ))}
            {loading && (
                <div className='flex items-center justify-center min-h-20'>
                    {/* Spinner */}
                    <div className='w-6 h-6 border-4 border-gray-500 border-t-transparent rounded-full animate-spin'></div>

                    {/* Loading Text */}
                    <p className='text-gray-600 text-lg animate-pulse px-4'>
                        {jobs.length > 0 ? `Loading more jobs...` : `Loading jobs...`}
                    </p>
                </div>
            )}
        </div>
    )
}

export default JobsLeftSidebar