'use client';

import React, { useState, useEffect } from 'react';
import JobCard from '@/components/job/jobCard/JobCard';
import JobFilters from '@/components/job/jobfilter/JobFilter';
import Pagination from '@/components/job/pagination/Paginatio';
import Button from '@/components/Button/Button';
import { useRouter } from 'next/navigation';

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

interface UserProps {
  name: string;
  role: string;
}

export default function JobListPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<UserProps>({
          name: 'Guest',
          role: 'Visitor'
  });
  
  const jobsPerPage = 4;

  useEffect(() => {
    const loadJobs = async () => {
      const savedJobs = localStorage.getItem('jobData');
      if (savedJobs) {
        setJobs(JSON.parse(savedJobs));
      } else {
        const res = await fetch('/models/jobData.json');
        const data: Job[] = await res.json();
        setJobs(data);
        localStorage.setItem('jobData', JSON.stringify(data));
      }
    };
    loadJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (jobTypeFilter) {
      filtered = filtered.filter((job) => job.jobType === jobTypeFilter);
    }

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [jobs, searchTerm, locationFilter, jobTypeFilter]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  useEffect(() => {
      if (typeof window !== 'undefined') {
      const userString = localStorage.getItem('user');
      if (userString) {
          setUser(JSON.parse(userString));
      }
      }
  }, []);

  const addjobHandler = () => {
    router.push('/add-job')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        {user?.role === "recruiter" ? 
        <div className="mb-8">
          <div className='flex justify-between'>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Posted Jobs({jobs?.length})</h1>
            </div>
            <div>
              <Button type='submit' onClick={() => addjobHandler()}>Add new job</Button>
            </div>
          </div>
        </div>:
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Job</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and interests</p>
        </div>
        }
      </div>

      <JobFilters
        searchTerm={searchTerm}
        locationFilter={locationFilter}
        jobTypeFilter={jobTypeFilter}
        onSearchChange={setSearchTerm}
        onLocationChange={setLocationFilter}
        onJobTypeChange={setJobTypeFilter}
      />

      <div className="space-y-6 mb-8">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
