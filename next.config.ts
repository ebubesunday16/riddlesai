import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: 'https://srv.adstxtmanager.com/19390/nofarehikes.net',
        permanent: true,
      },
    ];
  },

  typescript: {
   
    ignoreBuildErrors: true,
  },

  eslint: {

    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
