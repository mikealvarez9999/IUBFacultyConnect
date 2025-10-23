'use client';

import React from "react";
import { HiBuildingLibrary, HiAcademicCap, HiMagnifyingGlass } from "react-icons/hi2";

interface School {
  slug: string;
  name: string;
}

interface Department {
  slug: string;
  name: string;
}

interface DropdownProps {
  schools: School[];
  departments: Department[];
  selectedSchool: string;
  selectedDept: string;
  onSchoolChange: (slug: string) => void;
  onDeptChange: (slug: string) => void;
  onFind: () => void;
  disabled?: boolean;
}

export default function Dropdowns({
  schools,
  departments,
  selectedSchool,
  selectedDept,
  onSchoolChange,
  onDeptChange,
  onFind,
}: DropdownProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
      
      {/* School Dropdown */}
      <div className="relative flex-1 min-w-[200px]">
        <HiBuildingLibrary className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <select
          className="border rounded-sm p-3 pl-10 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition"
          value={selectedSchool}
          onChange={(e) => onSchoolChange(e.target.value)}
        >
          <option value="">Select School</option>
          {schools.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Department Dropdown */}
      <div className="relative flex-1 min-w-[200px]">
        <HiAcademicCap className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <select
          className="border rounded-sm p-3 pl-10 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:shadow-md transition disabled:cursor-not-allowed disabled:opacity-50"
          value={selectedDept}
          onChange={(e) => onDeptChange(e.target.value)}
          disabled={!selectedSchool || departments.length === 0}
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.slug} value={d.slug}>{d.name}</option>
          ))}
        </select>
      </div>

      {/* Find Button */}
      <button
        className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-medium px-5 py-3 rounded-sm shadow hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!selectedSchool || !selectedDept}
        onClick={onFind}
      >
        <HiMagnifyingGlass className="w-5 h-5" />
        Find
      </button>
    </div>
  );
}
