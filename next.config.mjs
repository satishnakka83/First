const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
  reactStrictMode: true,
  images: {
        qualities: [75, 100],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "ldcars.blr1.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ],
  },
};

export default nextConfig;
