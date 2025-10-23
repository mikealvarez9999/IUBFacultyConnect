// app/api/getDept/[schoolslug]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { schoolslug: string } }) {
  const { schoolslug } = params;

  try {
    // Fetch the school-specific data from IUB API
    const res = await fetch(`https://iub.ac.bd/api/directory/schools/${schoolslug}`);
    if (!res.ok) throw new Error('Failed to fetch school departments');

    const data = await res.json();

    // Map only the departments for dropdown
    const departments = (data.departments || []).map((d: any) => ({
      slug: d.slug,
      name: d.name,
    }));

    return NextResponse.json({ departments });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}
