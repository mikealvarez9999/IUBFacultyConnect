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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center space-y-4">
        {/* Faculty Image */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold overflow-hidden relative">
          {image ? (
            <Image src={image} alt={name} fill className="object-cover" />
          ) : (
            <span>{name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        {/* Faculty Info */}
        <div className="text-center space-y-2 w-full">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
            {name}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
            {designation}
          </p>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Dept:</span> {department}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">School:</span> {school}
            </p>
          </div>
          {email && (
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline break-all">
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          )}
          {phone && (
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              📞 {phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
