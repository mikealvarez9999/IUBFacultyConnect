'use client';

import React from "react";

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
}

export default function Dropdowns({ schools, departments, selectedSchool, selectedDept, onSchoolChange, onDeptChange, onFind }: DropdownProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        className="border p-2 rounded flex-1 min-w-[200px]"
        value={selectedSchool}
        onChange={(e) => onSchoolChange(e.target.value)}
      >
        <option value="">Select School</option>
        {schools.map((s) => (
          <option key={s.slug} value={s.slug}>{s.name}</option>
        ))}
      </select>

      <select
        className="border p-2 rounded flex-1 min-w-[200px]"
        value={selectedDept}
        onChange={(e) => onDeptChange(e.target.value)}
        disabled={!selectedSchool || departments.length === 0}
      >
        <option value="">Select Department</option>
        {departments.map((d) => (
          <option key={d.slug} value={d.slug}>{d.name}</option>
        ))}
      </select>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!selectedSchool || !selectedDept}
        onClick={onFind}
      >
        Find
      </button>
    </div>
  );
}
