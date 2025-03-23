import React, { useState } from 'react'
import { FileText, ArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import JobDetailsSkeleton from '../skeleton/JobDetailsSkeleton';

function JobRightSidebar({ selectedJob = {}, }) {
    const [iframeBlocked, setIframeBlocked] = useState(false)
    return (
        <div className='w-2/3 p-4 overflow-y-auto h-full'>
            {selectedJob ? (
                <div className='bg-white p-6 shadow-md rounded-lg'>
                    <div className='flex justify-between'>
                        <h1 className='text-3xl font-bold text-secondary-alt2'>
                            {selectedJob.title}
                        </h1>
                        <div className='flex flex-wrap items-center gap-4'>
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
                    <div className='flex justify-between'>
                        <div className='flex justify-items-start  mt-2'>
                            <p className='text-lg text-gray-600 mr-2'>
                                <strong>{selectedJob.organization},</strong>{' '}

                            </p>
                            <a
                                href={selectedJob.officialURL}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center text-blue-600 text-sm font-light underline hover:text-blue-700 transition-all'
                            >
                                {selectedJob.officialURL} {' '} <SquareArrowOutUpRight className='w-4 h-4 ml-1' />
                            </a>
                        </div>
                        <p>{selectedJob.location && ` - ${selectedJob.location}`}</p>


                    </div>
                    <p className='text-xl text-gray-700 mt-2 font-light'>
                        <strong>Qualification:</strong>{' '}
                        <span className='text-xl'>{selectedJob.qualification.join(', ')}</span>
                    </p>
                    <p className='mt-4 text-gray-700 leading-relaxed'>
                        {selectedJob.shortDescription}
                    </p>
                    <div className='flex justify-between'>
                        {selectedJob.totalVacancies && (
                            <p className='mt-2 text-gray-700'>
                                <strong>Vacancies:</strong>{' '}
                                <span className='text-2xl'>{selectedJob.totalVacancies}</span>
                            </p>
                        )}
                        <p className='mt-2 text-gray-700'>
                            <strong>Application Last Date:</strong>{' '}
                            <span className='text-2xl'>{new Date(
                                selectedJob.applicationLastDate
                            ).toLocaleDateString()}</span>
                        </p>
                    </div>
                    <div className='mt-6 border shadow-md rounded-lg overflow-visible'>
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
