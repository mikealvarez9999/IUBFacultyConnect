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
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3">
        {/* Faculty Image */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#D8B4FE] flex items-center justify-center text-white text-lg font-bold flex-shrink-0 overflow-hidden relative">
          {image ? (
            <Image src={image} alt={name} fill className="object-cover" />
          ) : (
            <span>{name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        {/* Faculty Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-[#1E1E1E] truncate mb-0.5">
            {name}
          </h3>
          <p className="text-xs text-[#6B7280] mb-1">
            {designation}
          </p>
          <div className="space-y-0.5">
            <p className="text-xs text-[#6B7280]">
              {department}
            </p>
            <p className="text-xs text-[#6B7280]">
              {school}
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="mt-2 space-y-1">
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
