'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { FileText, ArrowRight } from 'lucide-react';
import JobDetailsSkeleton from './skeleton/JobDetailsSkeleton';
import config from '../../config';
import Navbar from './components/Navbar';
import JobsLeftSidebar from './components/JobsLeftSidebar';
import JobRightSidebar from './components/JobRightSidebar';

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
        `${config.API_BASE_URL}/api/jobs?page=${pageNum}`,
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

  return (
    <div className='flex flex-col h-screen bg-gray-50'>
      {/* Filters and Search Bar */}
      <Navbar filters={filters} setFilters={setFilters} />

      <div className='flex h-full'>
        {/* Left Panel - Job List */}
        <JobsLeftSidebar
          jobs={jobs}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          lastJobElementRef={lastJobElementRef}
          loading={loading}
        />

        {/* Right Panel - Job Details */}
        <JobRightSidebar selectedJob={selectedJob} />
      </div>
    </div>
  );
}
