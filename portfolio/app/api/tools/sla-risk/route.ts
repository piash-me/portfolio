import { NextRequest, NextResponse } from 'next/server';

// Example API-backed tool endpoint. Replace this mock logic with your real
// data-analyst / automation calculation (or call out to a Python service).
export async function POST(req: NextRequest) {
  try {
    const { rows, lateRate } = await req.json();

    if (typeof rows !== 'number' || typeof lateRate !== 'number') {
      return NextResponse.json({ error: 'rows and lateRate must be numbers' }, { status: 400 });
    }

    const projectedBreaches = Math.round((rows * lateRate) / 100);
    const riskLevel = lateRate > 8 ? 'High' : lateRate > 4 ? 'Moderate' : 'Low';

    return NextResponse.json({ projectedBreaches, riskLevel });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
