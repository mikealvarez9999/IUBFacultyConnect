'use client';

import React, { useEffect, useState } from "react";
import FacultyCard from "@/components/FacultyCard";
// import StaffCard from "@/components/StaffCard";
import Dropdowns from "@/components/Dropdowns";
import Pagination from "@/components/Pagination";

export default function DirectoryPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [dean, setDean] = useState<any | null>(null);
  const [schoolStaff, setSchoolStaff] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [academicStaffs, setAcademicStaffs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    if (!schoolSlug) return;
    setSelectedSchool(schoolSlug);
    try {
      const res = await fetch(`/api/getDept/${schoolSlug}`);
      const data = await res.json();
      setDepartments(data.departments || []);
      setDean(data.dean || null);
      setSchoolStaff(data.schoolStaff || []);
      setSelectedDept("");
      setFaculties([]);
      setAcademicStaffs([]);
      setPage(1);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFaculties = async (pageNumber = 1) => {
    if (!selectedSchool || !selectedDept) return;
    try {
      const res = await fetch(`/api/faculties?school=${selectedSchool}&department=${selectedDept}&page=${pageNumber}`);
      const data = await res.json();
      setFaculties(data.faculties || []);
      setAcademicStaffs(data.academicStaffs || []);
      const total = data.pagination?.facultyTotal || data.faculties?.length || 0;
      setTotalPages(Math.ceil(total / PAGE_SIZE));
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Faculty Connect</h1>

      <Dropdowns
        schools={schools}
        departments={departments}
        selectedSchool={selectedSchool}
        selectedDept={selectedDept}
        onSchoolChange={fetchDepartmentsAndSchoolInfo}
        onDeptChange={setSelectedDept}
        onFind={() => fetchFaculties(1)}
      />

      {/* {dean && <Section title="School Dean" items={[dean]} Component={StaffCard} />} */}
      {/* {schoolStaff.length > 0 && <Section title="School Staff" items={schoolStaff} Component={StaffCard} />} */}
      {faculties.length > 0 && <Section title="" items={faculties} extraProps={{ selectedDept }}  Component={FacultyCard} />}
      {/* {academicStaffs.length > 0 && <Section title="Academic Staff" items={academicStaffs} Component={StaffCard} />} */}

      {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={page} onPageChange={fetchFaculties} />}

      {faculties.length === 0 && academicStaffs.length === 0 && selectedSchool && selectedDept && (
        <p className="mt-4 text-gray-500 text-center">
          No faculty or academic staff found for the selected school & department.
        </p>
      )}
    </div>
  );
}

function Section({ title, items, Component, extraProps }: any) {
  return (
    <div className="mb-6">
      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: any) => (
          <Component key={item.id} {...item} {...extraProps} />
        ))}
      </div>
    </div>
  );
}

