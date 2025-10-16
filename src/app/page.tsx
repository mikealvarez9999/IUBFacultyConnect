'use client';

import { useState, useEffect, useCallback } from 'react';
import FacultyCard from '@/components/FacultyCard';
import SearchFilters from '@/components/SearchFilters';

interface Faculty {
  id: number;
  name: string;
  designation: string;
  department: string;
  school: string;
  email?: string;
  phone?: string;
  image?: string;
}

export default function Home() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [filteredFaculties, setFilteredFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Search filters
  const [school, setSchool] = useState('');
  const [department, setDepartment] = useState('');
  const [query, setQuery] = useState('');

  // Fetch faculties from API
  const fetchFaculties = useCallback(async (pageNum: number = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        school,
        department,
        page: pageNum.toString(),
        size: '20',
      });

      const response = await fetch(`/api/faculties?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch faculty data');
      }

      const data = await response.json();
      
      // Handle different possible response structures
      let facultyData: Faculty[] = [];
      
      if (Array.isArray(data)) {
        facultyData = data;
      } else if (data.data && Array.isArray(data.data)) {
        facultyData = data.data;
      } else if (data.faculties && Array.isArray(data.faculties)) {
        facultyData = data.faculties;
      }

      if (pageNum === 1) {
        setFaculties(facultyData);
        setError(null);
      } else {
        setFaculties((prev) => [...prev, ...facultyData]);
      }

      setHasMore(facultyData.length === 20);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [school, department]);

  // Initial fetch and refetch when filters change
  useEffect(() => {
    setPage(1);
    fetchFaculties(1);
  }, [school, department, fetchFaculties]);

  // Filter faculties by search query
  useEffect(() => {
    if (!query.trim()) {
      setFilteredFaculties(faculties);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = faculties.filter((faculty) =>
        faculty.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredFaculties(filtered);
    }
  }, [faculties, query]);

  // Load more faculties
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchFaculties(nextPage);
  };

  return (
  <div className="w-full flex flex-col items-center justify-center">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] w-full flex justify-center">
        <div className="max-w-6xl w-full px-5 py-5 flex justify-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED] tracking-tight drop-shadow-md">
            Faculty Connect
          </h1>
        </div>
      </header>

      {/* Main Content */}
  <main className="max-w-6xl w-full px-5 py-5 flex flex-col items-center">
        {/* Search Filters */}
        <SearchFilters
          school={school}
          department={department}
          query={query}
          onSchoolChange={setSchool}
          onDepartmentChange={setDepartment}
          onQueryChange={setQuery}
        />

        {/* Error Message */}
        {error && filteredFaculties.length === 0 && (
          <div className="bg-[#FEE2E2] border border-[#FEE2E2] text-[#991B1B] px-4 py-3 rounded-2xl mb-4">
            <p className="font-semibold text-sm">Error: {error}</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mb-4 text-sm text-[#6B7280]">
            {filteredFaculties.length} {filteredFaculties.length === 1 ? 'contact' : 'contacts'}
          </div>
        )}

        {/* Loading State */}
        {loading && page === 1 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#A78BFA]"></div>
          </div>
        ) : (
          <>
            {/* Faculty Grid */}
            {filteredFaculties.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-base text-[#6B7280]">
                  No contacts found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                {filteredFaculties.map((faculty) => (
                  <FacultyCard
                    key={faculty.id}
                    name={faculty.name}
                    designation={faculty.designation}
                    department={faculty.department}
                    school={faculty.school}
                    email={faculty.email}
                    phone={faculty.phone}
                    image={faculty.image}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && !query && filteredFaculties.length > 0 && (
              <div className="flex justify-center mt-5">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-[#A78BFA] hover:bg-[#9061F9] disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-[10px] transition-all duration-200 text-sm"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
