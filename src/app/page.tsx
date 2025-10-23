"use client";

import React, { useEffect, useState } from "react";

interface Faculty {
  id: string;
  name: string;
  position?: string;
  image?: string;
  email?: string;
  school?: string;
  department?: string;
  slug?: string;
  officeAddress?: string;
  googleScholarLink?: string;
  orchidLink?: string;
  areaOfExpertise?: any[];
  totalCitations?: number;
  hIndex?: number;
  i10Index?: number;
}

interface Staff {
  id: string;
  name: string;
  position?: string;
  image?: string;
  email?: string;
  officeAddress?: string;
}

interface School {
  slug: string;
  name: string;
}

interface Department {
  slug: string;
  name: string;
}

export default function DirectoryPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [dean, setDean] = useState<Staff | null>(null);
  const [schoolStaff, setSchoolStaff] = useState<Staff[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [academicStaffs, setAcademicStaffs] = useState<Staff[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_SIZE = 10;

  // Fetch schools on mount
  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/directory");
        const data = await res.json();
        const schoolList: School[] = (data.schoolDirectory || []).map(
          (s: any) => ({
            slug: s.slug,
            name: s.name,
          })
        );
        setSchools(schoolList);
      } catch (err) {
        console.error("Failed to fetch schools:", err);
      }
    }
    fetchSchools();
  }, []);

  // Fetch departments and school info when a school is selected
  const fetchDepartmentsAndSchoolInfo = async (schoolSlug: string) => {
    if (!schoolSlug) return;
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
      console.error("Failed to fetch departments/school info:", err);
    }
  };

  // Fetch faculties + academic staffs
  const fetchFaculties = async (pageNumber = 1) => {
    if (!selectedSchool || !selectedDept) return;
    try {
      const res = await fetch(
        `/api/faculties?school=${selectedSchool}&department=${selectedDept}&page=${pageNumber}`
      );
      const data = await res.json();

      setFaculties(data.faculties || []);
      setAcademicStaffs(data.academicStaffs || []); // only set once, first fetch
      const total =
        data.pagination?.facultyTotal || data.faculties?.length || 0;
      setTotalPages(Math.ceil(total / PAGE_SIZE));
      setPage(pageNumber);
    } catch (err) {
      console.error("Failed to fetch faculties:", err);
    }
  };

  const renderStaffCard = (s: Staff, showViewMore = false, slug?: string) => (
    <div key={s.id} className="border p-4 rounded flex flex-col items-center">
      {s.image && (
        <img
          src={s.image}
          alt={s.name}
          className="w-24 h-24 rounded-full object-cover mb-3"
        />
      )}
      <h2 className="font-semibold text-center">{s.name}</h2>
      {s.position && (
        <p className="text-sm text-gray-600 text-center">{s.position}</p>
      )}
      {s.email && <p className="text-sm text-blue-600 truncate">{s.email}</p>}
      {s.officeAddress && (
        <p className="text-sm text-gray-500">{s.officeAddress}</p>
      )}
      {showViewMore && slug && (
        <a
          href={`https://iub.ac.bd/faculties/${slug}`}
          target="_blank"
          className="mt-3 text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
        >
          View More
        </a>
      )}
    </div>
  );

  const renderFacultyCard = (f: Faculty) => (
    <div key={f.id} className="border p-4 rounded flex flex-col items-center">
      {f.image && (
        <img
          src={f.image}
          alt={f.name}
          className="w-24 h-24 rounded-full object-cover mb-3"
        />
      )}
      <h2 className="font-semibold text-center">{f.name}</h2>
      {f.position && (
        <p className="text-sm text-gray-600 text-center">{f.position}</p>
      )}
      {f.department && <p className="text-sm text-gray-500">{f.department}</p>}
      {f.email && <p className="text-sm text-blue-600 truncate">{f.email}</p>}
      {f.officeAddress && (
        <p className="text-sm text-gray-500">{f.officeAddress}</p>
      )}

      {/* Area of expertise */}
      {/* <ul className="text-sm text-gray-700 mt-2 list-disc list-inside">
        {f.areaOfExpertise
          ?.flatMap(
            (block: any) =>
              block.children?.flatMap(
                (li: any) => li.children?.map((c: any) => c.text) || []
              ) || []
          )
          .map((text: string, idx: number) => (
            <li key={idx}>{text}</li>
          ))}
      </ul> */}

      {/* Links */}
      {/* <div className="flex gap-2 mt-2 flex-wrap justify-center">
        {f.googleScholarLink && (
          <a
            href={f.googleScholarLink}
            target="_blank"
            className="text-sm text-blue-500 underline"
          >
            Google Scholar
          </a>
        )}
        {f.orchidLink && (
          <a
            href={f.orchidLink}
            target="_blank"
            className="text-sm text-blue-500 underline"
          >
            ORCID
          </a>
        )}
      </div> */}

      {/* View more */}
      <a
        href={`https://iub.ac.bd/faculties/${f.slug}`}
        target="_blank"
        className="mt-3 text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
      >
        View More
      </a>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Faculty Directory</h1>

      {/* Dropdowns */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border p-2 rounded flex-1 min-w-[200px]"
          value={selectedSchool}
          onChange={(e) => {
            const schoolSlug = e.target.value;
            setSelectedSchool(schoolSlug);
            fetchDepartmentsAndSchoolInfo(schoolSlug);
          }}
        >
          <option value="">Select School</option>
          {schools.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded flex-1 min-w-[200px]"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          disabled={!selectedSchool || departments.length === 0}
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!selectedSchool || !selectedDept}
          onClick={() => fetchFaculties(1)}
        >
          Find
        </button>
      </div>

      {/* Dean */}
      {dean && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">School Dean</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderStaffCard(dean)}
          </div>
        </div>
      )}

      {/* School Staff */}
      {schoolStaff.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">School Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolStaff.map((s) => renderStaffCard(s))}
          </div>
        </div>
      )}

      {/* Faculties */}
      {faculties.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Faculties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculties.map((f) => renderFacultyCard(f))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => fetchFaculties(idx + 1)}
              className={`px-3 py-1 rounded border ${
                page === idx + 1 ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Academic Staff */}
      {academicStaffs.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Academic Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicStaffs.map((s) => renderStaffCard(s))}
          </div>
        </div>
      )}

      {faculties.length === 0 &&
        academicStaffs.length === 0 &&
        selectedSchool &&
        selectedDept && (
          <p className="mt-4 text-gray-500 text-center">
            No faculty or academic staff found for the selected school &
            department.
          </p>
        )}
    </div>
  );
}
