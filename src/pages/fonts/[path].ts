import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const path = params.path;
  const backendUrl = `https://font-repo.pages.dev/${path}`;

  const response = await fetch(backendUrl, { headers: request.headers });
  return new Response(response.body, {
    status: response.status,
    headers: {
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      ...response.headers
    }
  });
}
