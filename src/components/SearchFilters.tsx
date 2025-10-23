'use client';

import React, { useState, useEffect } from 'react';
import SearchableDropdown from './SearchableDropdown';

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
  const [schools, setSchools] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);

  // Fetch filter options
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('/api/filters');
        if (response.ok) {
          const data = await response.json();
          setSchools(data.schools || []);
          setDepartments(data.departments || []);
        }
      } catch (error) {
        console.error('Failed to fetch filters:', error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#ede9fe] to-[#f3f4f6] rounded-2xl shadow-lg border-2 border-[#A78BFA] p-8 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
        {/* Faculty Name Search */}
        <div>
          <label
            htmlFor="faculty-search"
            className="block text-lg font-bold text-[#7C3AED] mb-2 tracking-wide"
          >
            Name
          </label>
          <input
            id="faculty-search"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name..."
            className="w-full px-4 py-3 border-2 border-[#A78BFA] rounded-[10px] focus:ring-2 focus:ring-[#A78BFA] focus:border-[#7C3AED] transition-all duration-200 text-base text-[#1E1E1E] placeholder:text-[#A78BFA] bg-white shadow-sm"
          />
        </div>

        {/* School Filter */}
        <SearchableDropdown
          label="School"
          value={school}
          onChange={onSchoolChange}
          options={schools}
          placeholder="All Schools"
        />

        {/* Department Filter */}
        <SearchableDropdown
          label="Department"
          value={department}
          onChange={onDepartmentChange}
          options={departments}
          placeholder="All Departments"
        />
      </div>
    </div>
  );
}
