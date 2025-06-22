'use client';
import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Briefcase, DollarSign, Clock, ArrowLeft, Upload, Send } from 'lucide-react';
import Input from '@/components/input/Input';

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

interface Application {
    fullName: string;
    email: string;
    phone: string;
    resume: any;
    coverLetter: string;
}

interface UserProps {
  name: string;
  role: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function JobDescriptionPage({ params }: PageProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<Application>({
      fullName: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Application>>({});
  const [user, setUser] = useState<UserProps>({
          name: 'Guest',
          role: 'Visitor'
    });

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      const res = await fetch('/models/jobData.json');
      const jobs: Job[] = await res.json();
      const currentJob = jobs.find(j => j.id === params.id);
     const userDetails = localStorage.getItem('user');
        if (userDetails) {
        setUser(JSON.parse(userDetails));
        }
      setJob(currentJob || null);
      setLoading(false);
    };

    if (params.id) {
        fetchJobDetails();
    }
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setApplication(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
          setApplication(prev => ({ ...prev, resume: e.target.files![0] }));
      }
  };

  const validateForm = (): boolean => {
      const newErrors: Partial<Application> = {};
      if (!application.fullName.trim()) newErrors.fullName = 'Full name is required.';
      if (!application.email.trim() || !/\S+@\S+\.\S+/.test(application.email)) newErrors.email = 'A valid email is required.';
      if (!application.resume) newErrors.resume = 'A resume is required.';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
          console.log('Application Submitted:', application);
          setSubmitted(true);
      }
  };

  if (loading) {
    return <div className="text-center py-20">Loading job details...</div>;
  }

  if (!job) {
    return <div className="text-center py-20">Job not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <a href="/joblisting" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job Listings
      </a>
      
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-10 grid grid-cols-1 lg:grid-cols-2">
        <div className='mr-4'>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 mb-6">
                <span className="flex items-center"><Building2 className="h-5 w-5 mr-2 text-gray-400" />{job.company}</span>
                <span className="flex items-center"><MapPin className="h-5 w-5 mr-2 text-gray-400" />{job.location}</span>
                <span className="flex items-center"><Briefcase className="h-5 w-5 mr-2 text-gray-400" />{job.jobType}</span>
                {job.salary && <span className="flex items-center"><DollarSign className="h-5 w-5 mr-2 text-gray-400" />{job.salary}</span>}
                <span className="flex items-center"><Clock className="h-5 w-5 mr-2 text-gray-400" />Posted on {new Date(job.postedDate).toLocaleDateString()}</span>
            </div>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Job Description</h2>
                <p>{job.description}</p>
            </div>
        </div>
        <div>
            {user?.role === "recruiter" ? 
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">No of applicant</h2>
                <div className="text-center p-10 rounded-lg">
                    <p className="text-gray-700 mt-2">No data found</p>
                </div>
            </div>
            :
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this position</h2>
                {submitted ? (
                    <div className="text-center p-10 bg-green-50 rounded-lg">
                        <h3 className="text-xl font-semibold text-green-800">Application Submitted!</h3>
                        <p className="text-green-700 mt-2">Thank you for applying. We will review your application and be in touch.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 gap-6">
                            <Input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={application.fullName}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                label="Full Name"
                                required
                                htmlFor="fullName"
                                error={errors.fullName || ''}
                            />
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={application.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                label="Email Address"
                                required
                                htmlFor="email"
                                error={errors.email || ''}
                            />
                            <Input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={application.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                label="Phone Number (Optional)"
                                htmlFor="phone"
                                error=""
                            />
                        </div>
                        <div className='mt-6'>
                            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Resume/CV</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-indigo-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-2 text-indigo-500" />
                                        <p className="mb-1 text-sm text-indigo-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-indigo-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                                    </div>
                                    <input id="resume" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                </label>
                            </div>
                            {application.resume && <p className="text-green-600 text-sm mt-1 p-2">{application.resume.name}</p>}
                            {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
                        </div>
                        <div className="mt-6">
                            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
                            <textarea id="coverLetter" name="coverLetter" rows={5} value={application.coverLetter} onChange={handleInputChange} className="w-full p-2 border rounded-md focus:outline-none border-gray-300 focus:border-indigo-500"></textarea>
                        </div>
                        <div className="mt-6 text-right">
                            <button type="submit" className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
                                <Send className="h-4 w-4 mr-2" />
                                Submit Application
                            </button>
                        </div>
                    </form>
                )}
            </div>}
        </div>
      </div>

    </div>
  );
}
