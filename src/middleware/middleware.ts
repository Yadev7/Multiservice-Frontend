


// middleware.ts

import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';



// 1. Specify protected and public paths

const protectedPath = '/post-task';

const publicPaths = ['/sign-in', '/sign-up']; // Pages the user can visit when NOT logged in



export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;



  // If logged in, only allow /post-task

  if (token) {

    if (pathname !== protectedPath && !pathname.startsWith('/api')) {

      return NextResponse.redirect(new URL(protectedPath, request.url));

    }

    // Allow /post-task and API routes

    return NextResponse.next();

  }



  // If not logged in, block /post-task

  if (!token && pathname === protectedPath) {

    return NextResponse.redirect(new URL('/sign-in', request.url));

  }



  // Allow public pages

  return NextResponse.next();

}



// See "Matching Paths" below to learn more

export const config = {

  matcher: [

    /*

     * Match all request paths except for the ones starting with:

     * - _next/static (static files)

     * - _next/image (image optimization files)

     * - favicon.ico (favicon file)

     */

    '/((?!_next/static|_next/image|favicon.ico).*)',

  ],

};