import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production'
    // React dev mode (Turbopack/Fast Refresh) needs 'unsafe-eval' for callstack
    // reconstruction and HMR. Production bundles never use eval.
    const scriptSrc = [
      "script-src 'self' 'unsafe-inline'",
      isDev && "'unsafe-eval'",
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
    ]
      .filter(Boolean)
      .join(' ')

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' https: data:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.sanity.io https://www.google-analytics.com https://www.googletagmanager.com https://portal.revun.com https://phpstack-1217932-6516253.cloudwaysapps.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/what-is-revun',
        destination: '/why-revun/',
        permanent: true,
      },
      // The nine /*-software/ landing pages were retired from the nav, footer
      // and sitemap. They sat at sitemap priority 0.8 and target the highest
      // commercial-intent terms in this category, so they are 301'd to the
      // closest surviving page rather than left to 404 — that keeps any ranking
      // and inbound links pointing somewhere real.
      { source: '/property-management-software', destination: '/features/', permanent: true },
      { source: '/property-operations-software', destination: '/features/', permanent: true },
      { source: '/property-management-operating-system', destination: '/features/', permanent: true },
      { source: '/ai-property-management-software', destination: '/features/ai-automation/', permanent: true },
      { source: '/leasing-software', destination: '/features/leasing/', permanent: true },
      { source: '/maintenance-management-software', destination: '/features/maintenance/', permanent: true },
      { source: '/tenant-portal-software', destination: '/features/tenant-portal/', permanent: true },
      { source: '/brokerage-software', destination: '/solutions/brokerages/', permanent: true },
      { source: '/real-estate-communications-software', destination: '/features/communications/', permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
