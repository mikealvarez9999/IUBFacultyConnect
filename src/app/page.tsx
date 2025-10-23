'use client';

import React, { useEffect, useState } from "react";
import FacultyCard from "@/components/FacultyCard";
import Dropdowns from "@/components/Dropdowns";
import Pagination from "@/components/Pagination";

export default function DirectoryPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = useState(""); 
  const [selectedDept, setSelectedDept] = useState(""); 
  const [faculties, setFaculties] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const PAGE_SIZE = 10;

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/directory");
        const data = await res.json();
        setSchools(data.schoolDirectory || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSchools();
  }, []);

  const fetchDepartmentsAndSchoolInfo = async (schoolSlug: string) => {
    setSelectedSchool(schoolSlug);
    setSelectedDept(" ");
    setFaculties([]);
    setPage(1);

    if (schoolSlug === " ") {
      setDepartments([{ slug: " ", name: "All Departments" }]);
      setSelectedDept(" "); 
      return;
    }

    try {
      const res = await fetch(`/api/getDept/${schoolSlug}`);
      const data = await res.json();
      setDepartments([
        { slug: " ", name: "All Departments" },
        ...(data.departments || []),
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFaculties = async (pageNumber = 1) => {
    if (!selectedSchool || !selectedDept) return;

    setLoading(true);
    setSearched(true);

    try {
      let url = `/api/faculties?page=${pageNumber}`;
      if (selectedSchool !== " ") url += `&school=${selectedSchool}`;
      if (selectedDept !== " ") url += `&department=${selectedDept}`;

      const res = await fetch(url);
      const data = await res.json();
      setFaculties(data.faculties || []);
      const total =
        data.pagination?.facultyTotal || data.faculties?.length || 0;
      setTotalPages(Math.ceil(total / PAGE_SIZE));
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Faculty Connect
      </h1>

      <Dropdowns
        schools={[{ slug: " ", name: "All Schools" }, ...schools]}
        departments={departments}
        selectedSchool={selectedSchool}
        selectedDept={selectedDept}
        onSchoolChange={fetchDepartmentsAndSchoolInfo}
        onDeptChange={setSelectedDept}
        onFind={() => fetchFaculties(1)}
        disabled={loading}
      />

      {loading ? (
        <SkeletonGrid count={PAGE_SIZE} />
      ) : faculties.length > 0 ? (
        <Section
          title="Faculties"
          items={faculties}
          extraProps={{ selectedDept }}
          Component={FacultyCard}
        />
      ) : (
        searched && (
          <p className="mt-6 text-gray-500 text-center">
            No faculty found for the selected school & department.
          </p>
        )
      )}

      {!loading && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={fetchFaculties}
        />
      )}
    </div>
  );
}

function Section({ title, items, Component, extraProps }: any) {
  return (
    <div className="mb-8">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item: any) => (
          <div
            className="hover:shadow-lg transition-shadow duration-300 rounded-lg"
            key={item.id}
          >
            <Component {...item} {...extraProps} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton loader for loading state
function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-white rounded-lg p-4 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}
