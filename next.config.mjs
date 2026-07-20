/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/management-is-a-dial-not-a-switch",
        destination: "/blog/leadership-lessons-on-context-and-control",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
