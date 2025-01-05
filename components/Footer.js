import { useState } from 'react'; // Import useState hook
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';



const Footer = () => (
  <footer style={{ padding: '20px', backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a href="/" className="flex items-center justify-center text-gray-900">
              <img src="/fotter.png" alt="Logo" width={500} height={150} className="rounded-3xl" />
            </a>
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
            {/* <p className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent mt-2 text-center text-sm" >
            Explore. Stream. Online.  
            </p>
            <p className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent mt-2 text-center text-sm" >
            HD Movies and TV Series Free
            </p> */}
            </div>
    <p className="text-black hover:px-0 text-bg font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent mt-2 text-center text-sm" >© 2025 Ko-fi-Payat™ - All Rights Reserved</p>
    {/* <nav>
      <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
    </nav> */}
  </footer>
);

export default Footer;
