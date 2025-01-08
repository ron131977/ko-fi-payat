// import Link from 'next/link';

// const Header = () => (
//   <header style={{ padding: '20px', backgroundColor: '#333', color: '#fff' }}>
//     <div className="container">
//       <h1>Just Watch Free™</h1>
//       <nav>
//         <Link href="/">Home</Link>
//       </nav>
//     </div>
//   </header>
// );

// export default Header;



import Link from 'next/link';
import { useState } from 'react'; // Import useState hook
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';


export default function Home() {
  const [navbar, setNavbar] = useState(false);

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  return (
    <div>
  <nav className="w-full bg-black" >
  <div className="px-4 mx-auto md:flex md:items-center md:justify-between md:px-8">
          <div className="flex items-center py-3 md:py-5">
            <div className="flex items-center flex-col">
              <img src='/logo.png' alt='Logo' title="Master Logo" width={450} height={100} className="rounded-3xl" />
              <div className="flex justify-center mt-4">
              <a href="https://www.youtube.com/channel/UCiYD6dTKTk0cRnhCo-3SKzw/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
              {/* <p className='px-0 text-xl font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent'>
              Explore. Stream. Online.  
            </p>
            <p className='px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent'>
                HD Movies and TV Series Free
            </p> */}
            </div>
            {/* <div className="flex justify-center mt-4">
              <a href="https://www.youtube.com/channel/UCiYD6dTKTk0cRnhCo-3SKzw/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 mx-2">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div> */}
            <button className="md:hidden" onClick={toggleNavbar}>
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {navbar ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
          <div className={`md:flex ${navbar ? 'block' : 'hidden'} space-x-6 md:w-auto md:items-right`}>
          {/* <div className={`md:flex md:items-center space-x-4 ${navbar ? 'block' : 'hidden'}`}> */}
            <div className="md:flex-grow"></div>
            <div className="md:flex md:items-center text-center">
              <a href="/">
                <div className=" px-px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl  hover:text-blue-800 block mt-4 md:inline-block md:mt-0  mr-4 font-bold" >
                  Home
                </div>
                </a>
              <a href="/intro/contact">
              <div className=" px-px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl  hover:text-blue-800 block mt-4 md:inline-block md:mt-0  mr-4 font-bold" >
                  Contact
                </div>
              </a>
              <a href="/intro/privacy">
              <div className=" px-px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl  hover:text-blue-800 block mt-4 md:inline-block md:mt-0  mr-4 font-bold" >
                 Privacy Policy
                </div>
              </a>
              <a href="/intro/tearms">
              <div className=" px-px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl  hover:text-blue-800 block mt-4 md:inline-block md:mt-0  mr-4 font-bold" >
              Terms of Use
                </div>
              </a>
             <a href="/intro/dmca">
             <div className=" px-px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl  hover:text-blue-800 block mt-4 md:inline-block md:mt-0  mr-4 font-bold" >
                 D.M.C.A
                </div>
              </a>
              <a href="/intro/cookiepolicy">
             <div className=" px-px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl  hover:text-blue-800 block mt-4 md:inline-block md:mt-0  mr-4 font-bold" >
             Cookie Policy
                </div>
              </a>
                  </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

