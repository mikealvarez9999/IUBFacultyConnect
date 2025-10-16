import { NextRequest, NextResponse } from 'next/server';

// Sample faculty data for demonstration
const SAMPLE_FACULTIES = [
  {
    id: 1,
    name: "Dr. Ahmed Rahman",
    designation: "Professor",
    department: "Computer Science & Engineering",
    school: "SEBE",
    email: "ahmed.rahman@iub.edu.bd",
    phone: "+880-1234-567890",
  },
  {
    id: 2,
    name: "Dr. Fatima Khan",
    designation: "Associate Professor",
    department: "Electrical & Electronic Engineering",
    school: "SEBE",
    email: "fatima.khan@iub.edu.bd",
    phone: "+880-1234-567891",
  },
  {
    id: 3,
    name: "Dr. Mohammad Islam",
    designation: "Assistant Professor",
    department: "Business Administration",
    school: "SBS",
    email: "mohammad.islam@iub.edu.bd",
    phone: "+880-1234-567892",
  },
  {
    id: 4,
    name: "Dr. Sarah Ali",
    designation: "Professor",
    department: "English",
    school: "SLASS",
    email: "sarah.ali@iub.edu.bd",
    phone: "+880-1234-567893",
  },
  {
    id: 5,
    name: "Dr. Karim Hassan",
    designation: "Associate Professor",
    department: "Economics",
    school: "SLASS",
    email: "karim.hassan@iub.edu.bd",
    phone: "+880-1234-567894",
  },
  {
    id: 6,
    name: "Dr. Nadia Ahmed",
    designation: "Assistant Professor",
    department: "Civil Engineering",
    school: "SEBE",
    email: "nadia.ahmed@iub.edu.bd",
    phone: "+880-1234-567895",
  },
  {
    id: 7,
    name: "Dr. Rashid Mahmud",
    designation: "Professor",
    department: "Computer Science & Engineering",
    school: "SEBE",
    email: "rashid.mahmud@iub.edu.bd",
    phone: "+880-1234-567896",
  },
  {
    id: 8,
    name: "Dr. Ayesha Begum",
    designation: "Associate Professor",
    department: "Marketing",
    school: "SBS",
    email: "ayesha.begum@iub.edu.bd",
    phone: "+880-1234-567897",
  },
  {
    id: 9,
    name: "Dr. Tariq Rahman",
    designation: "Assistant Professor",
    department: "Mathematics",
    school: "SLASS",
    email: "tariq.rahman@iub.edu.bd",
    phone: "+880-1234-567898",
  },
  {
    id: 10,
    name: "Dr. Zainab Hossain",
    designation: "Professor",
    department: "Physics",
    school: "SLASS",
    email: "zainab.hossain@iub.edu.bd",
    phone: "+880-1234-567899",
  },
  {
    id: 11,
    name: "Dr. Omar Faruk",
    designation: "Associate Professor",
    department: "Finance",
    school: "SBS",
    email: "omar.faruk@iub.edu.bd",
    phone: "+880-1234-567800",
  },
  {
    id: 12,
    name: "Dr. Lubna Chowdhury",
    designation: "Assistant Professor",
    department: "Environmental Science",
    school: "SEBE",
    email: "lubna.chowdhury@iub.edu.bd",
    phone: "+880-1234-567801",
  },
  {
    id: 13,
    name: "Dr. Imran Kabir",
    designation: "Professor",
    department: "Accounting",
    school: "SBS",
    email: "imran.kabir@iub.edu.bd",
    phone: "+880-1234-567802",
  },
  {
    id: 14,
    name: "Dr. Sadia Sultana",
    designation: "Associate Professor",
    department: "Sociology",
    school: "SLASS",
    email: "sadia.sultana@iub.edu.bd",
    phone: "+880-1234-567803",
  },
  {
    id: 15,
    name: "Dr. Jahangir Alam",
    designation: "Assistant Professor",
    department: "Mechanical Engineering",
    school: "SEBE",
    email: "jahangir.alam@iub.edu.bd",
    phone: "+880-1234-567804",
  },
  {
    id: 16,
    name: "Dr. Rukhsana Parvin",
    designation: "Professor",
    department: "Psychology",
    school: "SLASS",
    email: "rukhsana.parvin@iub.edu.bd",
    phone: "+880-1234-567805",
  },
  {
    id: 17,
    name: "Dr. Nasir Uddin",
    designation: "Associate Professor",
    department: "Management",
    school: "SBS",
    email: "nasir.uddin@iub.edu.bd",
    phone: "+880-1234-567806",
  },
  {
    id: 18,
    name: "Dr. Farzana Akter",
    designation: "Assistant Professor",
    department: "Chemistry",
    school: "SLASS",
    email: "farzana.akter@iub.edu.bd",
    phone: "+880-1234-567807",
  },
  {
    id: 19,
    name: "Dr. Kamrul Islam",
    designation: "Professor",
    department: "Computer Science & Engineering",
    school: "SEBE",
    email: "kamrul.islam@iub.edu.bd",
    phone: "+880-1234-567808",
  },
  {
    id: 20,
    name: "Dr. Shabnam Haque",
    designation: "Associate Professor",
    department: "Law",
    school: "SLASS",
    email: "shabnam.haque@iub.edu.bd",
    phone: "+880-1234-567809",
  },
  {
    id: 21,
    name: "Dr. Rafiqul Alam",
    designation: "Assistant Professor",
    department: "Architecture",
    school: "SEBE",
    email: "rafiqul.alam@iub.edu.bd",
    phone: "+880-1234-567810",
  },
  {
    id: 22,
    name: "Dr. Munira Begum",
    designation: "Professor",
    department: "Media & Communication",
    school: "SLASS",
    email: "munira.begum@iub.edu.bd",
    phone: "+880-1234-567811",
  },
  {
    id: 23,
    name: "Dr. Abdul Karim",
    designation: "Associate Professor",
    department: "International Relations",
    school: "SLASS",
    email: "abdul.karim@iub.edu.bd",
    phone: "+880-1234-567812",
  },
  {
    id: 24,
    name: "Dr. Tahmina Rahman",
    designation: "Assistant Professor",
    department: "Electrical & Electronic Engineering",
    school: "SEBE",
    email: "tahmina.rahman@iub.edu.bd",
    phone: "+880-1234-567813",
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const school = searchParams.get('school') || '';
    const department = searchParams.get('department') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '20');
    const slug = searchParams.get('slug') || '';

    // Try to fetch from external API
    const apiUrl = `https://iub.ac.bd/api/faculties-academic-staffs?school=${encodeURIComponent(school)}&department=${encodeURIComponent(department)}&page=${page}&size=${size}&slug=${encodeURIComponent(slug)}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    } catch {
      console.log('External API not available, using sample data');
    }

    // Fallback to sample data
    let filteredData = [...SAMPLE_FACULTIES];

    // Filter by school
    if (school) {
      filteredData = filteredData.filter(f => 
        f.school.toLowerCase().includes(school.toLowerCase())
      );
    }

    // Filter by department
    if (department) {
      filteredData = filteredData.filter(f => 
        f.department.toLowerCase().includes(department.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedData,
      total: filteredData.length,
      page,
      size,
      totalPages: Math.ceil(filteredData.length / size),
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch faculty data' },
      { status: 500 }
    );
  }
}
