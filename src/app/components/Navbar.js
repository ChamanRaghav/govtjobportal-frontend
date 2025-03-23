import React from 'react'

function Navbar({filters = {}, setFilters = () => {}}) {
    return (
        <div className='flex justify-between py-4 px-6  blue-background shadow-md'>
            <div className='flex items-center justify-center h-full mr-4'>
                <h2 className='text-xl font-bold text-white'>GovtJobsPortal</h2>
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
    )
}

export default Navbar