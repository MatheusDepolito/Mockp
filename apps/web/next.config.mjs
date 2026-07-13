/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'api.mapbox.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/profissional',
        destination: '/professional',
        permanent: true,
      },
      {
        source: '/profissional/corretor',
        destination: '/professional/solo-agent',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;