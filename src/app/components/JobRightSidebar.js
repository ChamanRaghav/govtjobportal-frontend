import React, { useState } from 'react'
import { FileText, ArrowRight } from 'lucide-react';
import JobDetailsSkeleton from '../skeleton/JobDetailsSkeleton';

function JobRightSidebar({selectedJob = {}, }) {
    const [iframeBlocked, setIframeBlocked] = useState(false)
    return (
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
                                className='pdf-viewer w-full h-[90vh] rounded-lg'
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
            )}
        </div>
    )
}

export default JobRightSidebar