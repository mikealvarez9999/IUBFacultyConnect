'use client';

import React from 'react';
import Image from 'next/image';

interface FacultyCardProps {
  name: string;
  designation: string;
  department: string;
  school: string;
  email?: string;
  phone?: string;
  image?: string;
}

export default function FacultyCard({
  name,
  designation,
  department,
  school,
  email,
  phone,
  image,
}: FacultyCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center max-w-md mx-auto">
      <div className="flex items-center gap-5 w-full">
        {/* Faculty Image */}
  <div className="w-16 h-16 rounded-full bg-white border-2 border-[#E5E7EB] flex items-center justify-center text-[#A78BFA] text-2xl font-bold flex-shrink-0 overflow-hidden relative shadow-sm">
          {image ? (
            <Image src={image} alt={name} fill className="object-cover" />
          ) : (
            <span>{name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        {/* Faculty Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-extrabold text-[#1E1E1E] truncate mb-1">
            {name}
          </h3>
          <p className="text-sm text-[#6B7280] mb-2">
            {designation}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded-full font-medium">
              {department}
            </span>
            <span className="bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded-full font-medium">
              {school}
            </span>
          </div>
          {/* Contact Info */}
          <div className="mt-2 flex flex-col gap-1">
            {email && (
              <a 
                href={`mailto:${email}`}
                className="text-xs text-[#A78BFA] hover:underline block truncate"
              >
                {email}
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="text-xs text-[#6B7280] hover:text-[#1E1E1E] block"
              >
                {phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
