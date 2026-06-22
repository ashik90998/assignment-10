/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongodb", "better-auth", "@better-auth/mongo-adapter"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['@better-auth/kysely-adapter'],
  },
};

export default nextConfig;

