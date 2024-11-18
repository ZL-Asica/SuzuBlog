import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { sanitizeQuery } from '@/services/utils';

function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Check if the path is not `/posts`
  if (request.nextUrl.pathname !== '/posts') {
    // Remove all search parameters for non-`/posts` paths
    if (url.searchParams.toString()) {
      url.search = '';
      const response = NextResponse.redirect(url, 301);
      response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
      return response;
    }
    return NextResponse.next();
  }

  // Filter and sanitize search parameters for `/posts`
  const updatedSearchParameters = new URLSearchParams();
  const allowedKeys = new Set(['category', 'tag', 'query']);

  for (const [key, value] of url.searchParams.entries()) {
    if (allowedKeys.has(key)) {
      updatedSearchParameters.set(
        key,
        key === 'query' ? sanitizeQuery(value) : value
      );
    }
  }

  const updatedSearchString = updatedSearchParameters.toString();

  const hasChanges = updatedSearchString !== url.searchParams.toString();

  // If parameters changed, redirect to the updated URL
  if (hasChanges) {
    url.search = updatedSearchString;
    const statusCode = updatedSearchString === '' ? 301 : 307;
    const response = NextResponse.redirect(url, statusCode);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }

  // Otherwise, continue
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

export default middleware;
