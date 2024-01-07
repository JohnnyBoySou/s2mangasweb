module.exports = {
    //basePath: '/pages',
    compiler: {
      styledComponents: {
        // Enable display of the component name along with the generated className (needed for debugging).
        displayName: true,
        // Enable SSR support
        ssr: true,
        // Optional
        fileName: false,
      },
    },
    images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'i.pinimg.com',
          },
          {
            protocol: 'https',
            hostname: 'img.lermanga.org',
        },
      ],
    },
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS, PUT, DELETE, PATCH' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          ],
        },
      ];
    },
  }