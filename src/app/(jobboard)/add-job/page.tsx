"use client";
import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import Input from '@/components/input/Input';
import Dropdown from '@/components/dropdown/Dropdown';
import Button from '@/components/Button/Button';
import toast from 'react-hot-toast';

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

export default function Page() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '' as Job['jobType'],
    description: '',
    salary: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const newJob = {
      ...formData,
      id: crypto.randomUUID(), 
      postedDate: new Date().toISOString().split('T')[0]
    };

    setTimeout(() => {
      const existingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const updatedJobs = [newJob, ...existingJobs];
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));

      toast.success('Job posted successfully!');

      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        title: '',
        company: '',
        location: '',
        jobType: 'Full-time',
        description: '',
        salary: ''
      });

      setTimeout(() => {
        window.location.href = '/joblisting';
      }, 1500);
    }, 1000);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const jobTypeOptions = [
    { label: 'Full-time', value: 'Full-time' },
    { label: 'Part-time', value: 'Part-time' },
    { label: 'Contract', value: 'Contract' },
    { label: 'Remote', value: 'Remote' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a href="/joblisting" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job Listings
       </a>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">
        <Input 
          placeholder='Enter job title'
          label='Job Title'
          required={true}
          htmlFor='title'
          onChange={handleChange}
          value={formData.title}
          name='title'
          id='title'
          type='text'
          error={errors.title}
        />
        <Input 
          placeholder='Enter company name'
          label='Company Name'
          required={true}
          htmlFor='company'
          onChange={handleChange}
          value={formData.company}
          name='company'
          id='company'
          type='text'
          error={errors.company}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            placeholder='Enter location'
            label='Location'
            required={true}
            htmlFor='location'
            onChange={handleChange}
            value={formData.location}
            name='location'
            id='location'
            type='text'
            error={errors.location}
          />
          <Dropdown 
            label="Job Type"
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            options={jobTypeOptions}
            required
          />
        </div>
        <Input 
          placeholder='e.g. $60k - $80k'
          label='Salary Range (Optional)'
          htmlFor='salary'
          onChange={handleChange}
          value={formData.salary}
          name='salary'
          id='salary'
          type='text'
          error=''
        />
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
          <textarea 
            id="description"
            name="description"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        <Button
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Posting...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
