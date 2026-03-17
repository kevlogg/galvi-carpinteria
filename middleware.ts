import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * El admin usa Firebase Auth; la protección real está en AuthGuard (client).
 * Este middleware solo redirige /admin a /admin si hace falta (opcional).
 */
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
