import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Paths that should be accessible only to unauthenticated users
const authPaths = [
  "/auth/signin",
  "/auth/forgot-password"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is protected (only /dashboard/*)
  const isDashboardPath = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  
  // Check if the path is an auth path
  const isAuthPath = authPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );

  // Get token from the session
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // If the path is a dashboard path and the user is not authenticated
  if (isDashboardPath && !token) {
    const url = new URL("/auth/signin", request.url);
    // Add the current path as a callbackUrl parameter
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  
  // If the path is an auth path and the user is authenticated
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    // Only run middleware on dashboard and auth paths
    "/dashboard/:path*",
    "/auth/:path*"
  ],
}; 