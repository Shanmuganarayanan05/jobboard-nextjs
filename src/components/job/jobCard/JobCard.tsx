'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // <-- add this
import { MapPin, Building2, Clock, DollarSign } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  description: string;
  salary?: string;
  postedDate: string;
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/job-description/${job.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Building2 className="h-4 w-4 mr-2" />
            <span className="mr-4">{job.company}</span>
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          job.jobType === 'Full-time' ? 'bg-green-100 text-green-800' :
          job.jobType === 'Part-time' ? 'bg-yellow-100 text-yellow-800' :
          job.jobType === 'Contract' ? 'bg-purple-100 text-purple-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {job.jobType}
        </span>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
      <div className="flex justify-between items-center">
        {job.salary && (
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.salary}</span>
          </div>
        )}
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>{new Date(job.postedDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
