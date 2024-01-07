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
          source: "/api/(.*)",
          headers: [
            // Allow for specific domains to have access or * for all
            {
              key: "Access-Control-Allow-Origin",
              value: "https://s2mangas.com",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
          ],
        },
      ];
    },
  }