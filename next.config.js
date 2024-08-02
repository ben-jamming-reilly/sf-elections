/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/js/script.js",
        destination: "https://plausible.io/js/script.outbound-links.js",
      },
      {
        source: "/api/event", // Or '/api/event/' if you have `trailingSlash: true` in this config
        destination: "https://plausible.io/api/event",
      },
      {
        source: "/wahlchecker",
        destination: "/",
      },
      {
        source: "/wahlchecker/:path*",
        destination: "/:path*",
      },
      {
        source: "/wahlkabine",
        destination: "/",
      },
      {
        source: "/wahlkabine/:path*",
        destination: "/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/fragen/:slug',
        destination: '/eu-2024/fragen/:slug',
        permanent: true,
      },
      {
        source: '/fragen/:slug/details',
        destination: '/eu-2024/fragen/:slug/details',
        permanent: true,
      },
      {
        source: '/fragen/:slug/details/:candidateSlug',
        destination: '/eu-2024/fragen/:slug/details/:candidateSlug',
        permanent: true,
      },
      {
        source: '/vergleich/:candidateSlugs*',
        destination: '/eu-2024/vergleich/:candidateSlugs*',
        permanent: true,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
