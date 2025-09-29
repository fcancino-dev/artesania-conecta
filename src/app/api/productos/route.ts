import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =`${process.env.BACKEND_URL}/api/productos`;

// GET todos los productos
export async function GET() {
  try {
    const res = await fetch(BACKEND_URL, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST crear producto
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
