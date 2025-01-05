// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: 'http://localhost:3000/',
//   changefreq: 'daily',
//   sitemapSize: 7000, // Limit of URLs in each sitemap file
//   // generateRobotsTxt: true, // Optionally generate robots.txt

//   // Define additional routes and their specific priorities
//   transform: async (config, path) => {
//     if (path === '/') {
//       return {
//         loc: path, // The homepage
//         changefreq: config.changefreq,
//         priority: 1.0, // Highest priority for the homepage
//         lastmod: new Date().toISOString(),
//       };
//     }
//     return {
//       loc: path, // All other pages
//       changefreq: config.changefreq,
//       priority: 0.9, // Slightly lower priority for other pages
//       lastmod: new Date().toISOString(),
//     };
//   },
// };

// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: 'http://localhost:3000/',
//   changefreq: 'daily',
//   priority: 0.9, // Set priority to just below the highest value
//   // generateRobotsTxt: true,
//   sitemapSize: 7000,
// };



// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: 'http://localhost:3000/', // Replace with your actual domain
//   generateRobotsTxt: true, // Generates robots.txt file
//   // Optionally define other options such as changefreq and priority
//   exclude: ['/api/*'], // Exclude any routes you don't want in the sitemap
// }


/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ko-fi-payat.vercel.app/', // Replace with your actual live domain
  changefreq: 'daily',
  sitemapSize: 7000,
  // generateRobotsTxt: true, // Optionally generate robots.txt
  transform: async (config, path) => {
    if (path === '/') {
      return {
        loc: path, // The homepage
        changefreq: config.changefreq,
        priority: 1.0, // Highest priority for the homepage
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path, // All other pages
      changefreq: config.changefreq,
      priority: 0.9, // Slightly lower priority for other pages
      lastmod: new Date().toISOString(),
    };
  },
};
