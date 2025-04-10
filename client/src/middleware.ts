// middleware.ts

import { pagePaths, PRIVATE_ROUTES } from '@/constants/pagePath';

import { NextResponse } from 'next/server';

export const middleware = (request: any) => {
  const token = request.cookies.get('jwtToken')?.value;
  const tokenInQuery = request.nextUrl.searchParams.get('authToken');
  if (tokenInQuery && request.nextUrl.pathname === pagePaths.MAIN) {
    return NextResponse.next()
  }

  const isPrivateRoute = PRIVATE_ROUTES.some((route) => {
    return request.nextUrl.pathname.startsWith(route);
  });

  if (token && request.nextUrl.pathname === pagePaths.LOGIN) {
    return NextResponse.redirect(new URL(pagePaths.MAIN, request.url));
  }

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL(pagePaths.LOGIN, request.url));
  }

  return NextResponse.next();
};
