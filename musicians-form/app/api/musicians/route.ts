import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		// Simulate persistence
		return NextResponse.json({ success: true, data: body }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ success: false, error: err?.message || "Invalid JSON" }, { status: 400 });
	}
}