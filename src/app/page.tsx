"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const userString = localStorage.getItem('user'); 
    if (userString) {
      const user = JSON.parse(userString);

      if (user.role === 'recruiter') {
        router.push('/addjob');
      } 
      else if(user.role === 'applicant') {
        router.push('/joblisting');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}
