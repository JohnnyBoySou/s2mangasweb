module.exports = {
    compiler: {
      styledComponents: true,
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
        {
          protocol: 'https',
          hostname: 'em-content.zobj.net',
        },
        {
          protocol: 'https',
          hostname: 'img.mangaschan.com',
        },
      ],
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/start',
          permanent: true,
        },
      ]
    },
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ]
        }
      ]
    }
  }