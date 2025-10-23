import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const school = searchParams.get('school') || '';
    const department = searchParams.get('department') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '20');
    const slug = searchParams.get('slug') || '';

    // Construct external API URL
    const apiUrl = `https://iub.ac.bd/api/faculties-academic-staffs?school=${encodeURIComponent(
      school
    )}&department=${encodeURIComponent(department)}&page=${page}&size=${size}&slug=${encodeURIComponent(slug)}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // cache 1 hour
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch faculty data from external API' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
