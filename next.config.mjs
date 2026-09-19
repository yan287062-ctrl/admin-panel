/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/supabase/:path*',
        destination: 'https://lejfhsuwajmzikmudmcs.supabase.co/:path*',
      },
    ];
  },
};

export default nextConfig;