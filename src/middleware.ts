import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { sanitizeQuery } from '@/services/utils';

function middleware(request: NextRequest) {
  request.headers.set('X-Themed-By', 'SuzuBlog');
  request.headers.set('X-Theme-Author', 'ZL Asica');
  request.headers.set('X-Theme-URL', 'https://suzu.zla.app');

  const url = request.nextUrl.clone();

  if (url.pathname.startsWith('/feed')) {
    if (url.searchParams.toString()) {
      return NextResponse.rewrite(new URL('/feed.xml', request.url));
    }
    return NextResponse.next();
  }

  if (!url.searchParams || !url.pathname || !url.search) {
    return NextResponse.next();
  }

  // Check if the path is not `/posts`
  if (url.pathname !== '/posts') {
    // Remove all search parameters for non-`/posts` paths
    if (url.searchParams.toString()) {
      url.search = '';
      return NextResponse.rewrite(new URL('/404', request.url));
    }
    return NextResponse.next();
  }

  // Filter and sanitize search parameters for `/posts`
  const updatedSearchParameters = new URLSearchParams();
  const allowedKeys = new Set(['category', 'tag', 'query', 'page']);

  for (const [key, value] of url.searchParams.entries()) {
    if (allowedKeys.has(key)) {
      updatedSearchParameters.set(key, key === 'query' ? sanitizeQuery(value) : value);
    }
  }

  const updatedSearchString = updatedSearchParameters.toString();

  const hasChanges = updatedSearchString !== url.searchParams.toString();

  // If parameters changed, redirect to the updated URL
  if (hasChanges) {
    url.search = updatedSearchString;
    if (url.search === '') {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
    const statusCode = 307;
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
    '/((?!api|_next/static|_next/image|_vercel|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
};

export default middleware;
