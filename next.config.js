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
        "source": "/wahlchecker",
        "destination": "/"
      },
      {
        "source": "/wahlchecker/:path*",
        "destination": "/:path*"
      },
      {
        "source": "/wahlkabine",
        "destination": "/"
      },
      {
        "source": "/wahlkabine/:path*",
        "destination": "/:path*"
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
