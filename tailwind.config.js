// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     // Or if using `src` directory:
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     opacity: {
//       '0': '0',
//       '20': '0.2',
//       '40': '0.4',
//       '60': '0.6',
//       '80': '0.8',
//       '100': '1',
//     },
//     extend: {
//       screens: {
//         '3xl': '1600px',
//       },
//     },
//   },
//   plugins: [
//     require('tw-elements/dist/plugin')
//   ],
// };



module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {},
  },

};
