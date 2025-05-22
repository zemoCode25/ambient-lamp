import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function GET() {
  const { data, error } = await supabase.from("record").select("*");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { Content: "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { temperature, humidity } = body;

  const { data, error } = await supabase
    .from("record")
    .insert([{ temperature, humidity }])
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data }, { status: 201 });
}
