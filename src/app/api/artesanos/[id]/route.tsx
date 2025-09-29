import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`http://localhost:4000/api/artesanos/${params.id}`);
  const data = await res.json();
  return NextResponse.json(data);
}
