import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const path = params.path;
  const cdnUrl = import.meta.env.FONTS_CDN_URL ?? "https://font-repo.pages.dev";
  const backendUrl = cdnUrl.replace(/\/+$/, '') + '/' + path;

  try {
    const response = await fetch(backendUrl, {
      headers: request.headers,
    });

    if (!response.ok) {
      return new Response(`Failed to fetch font: ${response.statusText}`, {
        status: response.status,
      });
    }

    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');

    return new Response(response.body, {
      status: response.status,
      headers,
    });

  } catch (error) {
    console.error("Font proxy error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
