import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Replace with your database query
    const document = {
      id: params.id,
      title: 'Sample Document',
      content: '<p>Sample content</p>',
      lastEdited: new Date().toISOString()
    };

    return NextResponse.json(document);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    // Replace with your database update logic
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Replace with your database creation logic
    const newDocument = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      lastEdited: new Date().toISOString()
    };
    
    return NextResponse.json(newDocument);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}