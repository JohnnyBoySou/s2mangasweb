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
              // matching all API routes
              source: "/api/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" }, 
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          }
      ]
  }
 
  }