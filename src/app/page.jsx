'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { FileText, ArrowRight } from 'lucide-react';
import SkeletonLoader from './skeletonLoader';
import JobDetailsSkeleton from './skeleton/JobDetailsSkeleton';

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    salary: '',
    datePosted: '',
  });
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const observer = useRef();

  const fetchJobs = async (pageNum) => {
    if (loading) return;
    setLoading(true);
    try {
      const filteredFilters = Object.keys(filters)
        .filter((key) => filters[key]) // Keep only truthy values
        .reduce((acc, key) => {
          acc[key] = filters[key];
          return acc;
        }, {});

      const response = await axios.get(
        `http://127.0.0.1:3000/api/jobs?page=${pageNum}`,
        { params: filteredFilters }
      );
      const jobRes = response.data.jobs || [];
      setJobs((prevJobs) => [...prevJobs, ...jobRes]);
      if (jobRes.length > 0 && pageNum === 1) {
        setSelectedJob(jobRes[0]);
      }
      setHasMore(jobRes.length > 0);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page, filters]);

  const lastJobElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  console.log('selectedJob', selectedJob);
  console.log('iframeBlocked', iframeBlocked);

  // if (jobs.length == 0) return <SkeletonLoader />;

  return (
    <div className='flex flex-col h-screen bg-gray-50'>
      {/* Filters and Search Bar */}
      <div className='flex justify-between py-4 px-6  blue-background shadow-md'>
        <div className='flex items-center justify-center h-full mr-4'>
          <h2 className='text-xl font-bold text-white'>GovtJobPortal</h2>
        </div>
        <div className='w-full max-w-lg flex items-center gap-3 border border-gray-300 rounded p-3 shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 text-gray-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>

          <input
            type='text'
            placeholder='Search by title, organization, qualification, etc...'
            className='w-full text-gray-700 placeholder-gray-400 border-none focus:outline-none bg-transparent'
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
        </div>
      </div>

      <div className='flex h-full'>
        {/* Left Panel - Job List */}
        <div className='w-1/3  shadow-lg p-4 overflow-y-auto'>
          {jobs.map((job, index) => (
            <div
              key={index}
              ref={index === jobs.length - 1 ? lastJobElementRef : null}
              className={`border p-4 my-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-pointer  hover:border-blue-500 ${
                selectedJob?._id == job._id
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

        {/* Right Panel - Job Details */}
        <div className='w-2/3 p-4 overflow-y-auto'>
          {selectedJob ? (
            <div className='bg-white p-6 shadow-md rounded-lg'>
              <h1 className='text-3xl font-bold text-secondary-alt2'>
                {selectedJob.title}
              </h1>
              <div className='flex justify-between'>
                <div className='flex justify-items-start'>
                  <p className='text-lg text-gray-600 mt-2'>
                    <strong>{selectedJob.organization},</strong>{' '}
                    <a href={selectedJob.officialURL}>
                      <span className='text-sm text-blue-500 underline'>
                        {' '}
                        {selectedJob.officialURL}
                      </span>
                    </a>{' '}
                  </p>
                </div>
                <p>{selectedJob.location && ` - ${selectedJob.location}`}</p>

                <div className='flex flex-wrap items-center gap-4 mt-3'>
                  {/* View Notification Link */}
                  <a
                    href={selectedJob.notificationURL}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center text-blue-600 text-sm font-medium underline hover:text-blue-700 transition-all'
                  >
                    <FileText className='w-4 h-4 mr-1' /> View Notification
                  </a>

                  {/* Apply Now Button (Only if applyURL exists) */}
                  {selectedJob?.applyURL && (
                    <a
                      href={selectedJob.applyURL}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all hover:bg-blue-700 hover:scale-105 shadow-md blue-background'
                    >
                      Apply Now <ArrowRight className='w-4 h-4' />
                    </a>
                  )}
                </div>
              </div>
              <p className='text-md text-gray-700 mt-2 font-semibold'>
                <strong>Qualification:</strong>{' '}
                {selectedJob.qualification.join(', ')}
              </p>
              <p className='mt-4 text-gray-700 leading-relaxed italic'>
                {selectedJob.shortDescription}
              </p>
              <div className='flex justify-between'>
                {selectedJob.totalVacancies && (
                  <p className='mt-2 text-gray-700'>
                    <strong>Total Vacancies:</strong>{' '}
                    {selectedJob.totalVacancies}
                  </p>
                )}
                <p className='mt-2 text-gray-700'>
                  <strong>Application Last Date:</strong>{' '}
                  {new Date(
                    selectedJob.applicationLastDate
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className='mt-6 border shadow-md rounded-lg overflow-hidden'>
                {iframeBlocked ? (
                  <a
                    href={selectedJob.notificationURL}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 font-semibold underline'
                  >
                    Visit Official Website
                  </a>
                ) : (
                  <iframe
                    src={selectedJob.notificationURL}
                    className='w-full h-[90vh] rounded-lg'
                    title='Notification'
                    onError={(er) => {
                      console.log(er);
                      setIframeBlocked(true);
                    }}
                  />
                )}
              </div>
            </div>
          ) : ( 
            <JobDetailsSkeleton />
            // <p className='text-gray-600 text-center'>No job selected</p>
          )}
        </div>
      </div>
    </div>
  );
}
