'use client';
import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';

interface Props {
  searchTerm: string;
  locationFilter: string;
  jobTypeFilter: string;
  onSearchChange: (val: string) => void;
  onLocationChange: (val: string) => void;
  onJobTypeChange: (val: string) => void;
}

const JobFilters: React.FC<Props> = ({
  searchTerm,
  locationFilter,
  jobTypeFilter,
  onSearchChange,
  onLocationChange,
  onJobTypeChange
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search jobs or companies..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Location..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={locationFilter}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <select
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none border-gray-300 focus:border-indigo-500 appearance-none"
          value={jobTypeFilter}
          onChange={(e) => onJobTypeChange(e.target.value)}
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Remote">Remote</option>
        </select>
      </div>
    </div>
  </div>
);

export default JobFilters;
