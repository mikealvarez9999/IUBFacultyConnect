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
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-5 mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Faculty Name Search */}
        <div>
          <label
            htmlFor="faculty-search"
            className="block text-sm font-semibold text-[#1E1E1E] mb-2"
          >
            Name
          </label>
          <input
            id="faculty-search"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name..."
            className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-[10px] focus:ring-2 focus:ring-[#A78BFA] focus:border-[#A78BFA] transition-all duration-200 text-sm text-[#1E1E1E] placeholder:text-[#6B7280]"
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
