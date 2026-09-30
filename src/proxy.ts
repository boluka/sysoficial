// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;
  let isTokenValid = false;
  if(token){
    try {
      await jwtVerify(token, secret);
      isTokenValid = true;
    }catch(error){
      isTokenValid = false
    }
  }

  if (isTokenValid && pathname === '/') {
    return NextResponse.redirect(new URL('/relatorio', request.url));
  }
  if (!isTokenValid && pathname.startsWith('/relatorio')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/', 
    '/relatorio/:path*' 
  ],
};
