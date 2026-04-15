/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove "x-powered-by: Next.js" response header
  poweredByHeader: false,

  // Proxy Vercel Analytics through your own domain so no external
  // script origins are visible in the network tab
  async rewrites() {
    return [
      {
        source: "/t/script.js",
        destination: "https://va.vercel-scripts.com/v1/script.js",
      },
      {
        source: "/t/event",
        destination: "https://va.vercel-scripts.com/api/vitals",
      },
    ];
  },

  // Security headers on every response
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
