import React from 'react'

function ProfilePageSkeleton() {
  return (
<section className="flex items-center justify-center min-h-screen">
        <div className="p-6 bg-white sm:w-2/3 lg:w-1/2 animate-pulse">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="w-40 h-8 mt-4 bg-gray-200 rounded"></div>
            <div className="h-4 mt-2 bg-gray-200 rounded w-60"></div>
          </div>
          <div>
            <div className="w-20 h-4 mb-2 bg-gray-200 rounded"></div>
            <div className="w-full h-6 mb-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 mb-2 bg-gray-200 rounded"></div>
            <div className="w-full h-6 mb-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 mb-2 bg-gray-200 rounded"></div>
            <div className="w-full h-6 mb-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 mb-2 bg-gray-200 rounded"></div>
            <div className="w-full h-6 mb-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-10 bg-gray-200 rounded-full"></div>
        </div>
      </section> 
       )
}

export default ProfilePageSkeleton