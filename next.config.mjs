/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.kopis.or.kr",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hobiday-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.hobiday.site",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
