'use client';

import React from 'react';

interface SearchFiltersProps {
  school: string;
  department: string;
  query: string;
  onSchoolChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onQueryChange: (value: string) => void;
}

export default function SearchFilters({
  school,
  department,
  query,
  onSchoolChange,
  onDepartmentChange,
  onQueryChange,
}: SearchFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Search Faculty
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Faculty Name Search */}
        <div>
          <label
            htmlFor="faculty-search"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Faculty Name
          </label>
          <input
            id="faculty-search"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* School Filter */}
        <div>
          <label
            htmlFor="school-filter"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            School
          </label>
          <input
            id="school-filter"
            type="text"
            value={school}
            onChange={(e) => onSchoolChange(e.target.value)}
            placeholder="e.g., SLASS, SEBE..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Department Filter */}
        <div>
          <label
            htmlFor="department-filter"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Department
          </label>
          <input
            id="department-filter"
            type="text"
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            placeholder="e.g., CSE, EEE..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
