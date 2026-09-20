/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lvptznfprobnfjquceok.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  eslint: {
    dirs: [
      "actions",
      "app",
      "components",
      "constants",
      "contexts",
      "emails",
      "global",
      "hooks",
      "lib",
      "middlewares",
      "services",
      "types",
    ],
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Las páginas del blog son dinámicas (el layout raíz lee cookies) y leen
    // los artículos de `content/blog` en cada request: esto garantiza que
    // esos archivos viajen dentro de las funciones serverless del deploy.
    outputFileTracingIncludes: {
      "/blog": ["./content/blog/**/*"],
      "/blog/[slug]": ["./content/blog/**/*"],
      "/blog/categoria/[categoria]": ["./content/blog/**/*"],
    },
  },
};

export default nextConfig;
