'use client';

import React from "react";
import { HiMail, HiOfficeBuilding, HiAcademicCap } from "react-icons/hi";

interface FacultyProps {
  id: string;
  name: string;
  position?: string;
  image?: string;
  email?: string;
  department?: string;
  selectedDept?: string;
  slug?: string;
  officeAddress?: string;
}

export default function FacultyCard({
  id,
  name,
  position,
  image,
  email,
  department,
  selectedDept,
  slug,
  officeAddress,
}: FacultyProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-gray-200"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-400">
          N/A
        </div>
      )}

      <h2 className="font-semibold text-lg text-gray-800">{name}</h2>
      {position && <p className="font-bold text-sm text-gray-500 mb-1">{position}</p>}

      <p className="text-sm text-gray-600 flex items-center gap-1 justify-center mb-1">
        {/* <HiAcademicCap className="w-5 h-5 text-gray-400" /> */}
         {department}
      </p>

      {email && (
        <p className="text-sm text-blue-900 flex items-center gap-1 justify-center truncate mb-1">
          <HiMail className="w-5 h-5" /> {email}
        </p>
      )}

      {officeAddress && (
        <p className="text-sm text-gray-500 flex items-center gap-1 justify-center mb-2">
          <HiOfficeBuilding className="w-5 h-5 text-gray-400" /> {officeAddress}
        </p>
      )}

      {slug && (
        <a
          href={`https://iub.ac.bd/academics/departments/${selectedDept}/faculty-and-staff/${slug}`}
          target="_blank"
          className="mt-2 px-4 py-2 bg-blue-100 rounded-lg hover:bg-blue-200 text-sm font-medium transition-colors duration-150 w-full text-center"
        >
          View More
        </a>
      )}
    </div>
  );
}
