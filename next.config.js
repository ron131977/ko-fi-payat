// next.config.js

// module.exports = {
//     images: {
//       domains: ['uwatchfreeonline.vercel.app'],
//     },
//   };
  

// next.config.js
module.exports = {
  /* Custom webpack configuration */
  webpack: (config, { dev, isServer }) => {
    // Modify webpack configuration here
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Assuming you're serving from port 3000 locally
      },
    ],
  },
};

