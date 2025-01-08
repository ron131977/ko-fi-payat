import '@styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import GoogleAnalytics from '@bradgarropy/next-google-analytics';
import ThemeSwitch from '../components/ThemeSwitch';
import { useEffect } from 'react';
import Head from 'next/head';

function Application({ Component, pageProps }) {

    // useEffect(() => {
  //   // Dynamically load the Ko-fi widget script
  //   const kofiScript = document.createElement('script');
  //   kofiScript.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
  //   kofiScript.async = true;

  //   kofiScript.onload = () => {
  //     console.log("Ko-fi widget loaded.");
  //     if (typeof kofiWidgetOverlay !== 'undefined') {
  //       kofiWidgetOverlay.draw('payat', {
  //         'type': 'floating-chat',
  //         'floating-chat.donateButton.text': 'Support me',
  //         'floating-chat.donateButton.background-color': '#00b9fe',
  //         'floating-chat.donateButton.text-color': '#fff'
  //       });
  //     }
  //   };

  //   document.body.appendChild(kofiScript);

  //   return () => {
  //     document.body.removeChild(kofiScript);
  //   };
  // }, []);


  return (
    <>
      
      <div className="center">
        {/* Google Analytics */}
        <GoogleAnalytics measurementId="G-LEN3ZV9LQM" />
        
        <PageTransition>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main>
            <ThemeSwitch />
            <Component {...pageProps} />
          </main>

          {/* Footer */}
          <Footer />
        </PageTransition>
      </div>
    </>
  );
}

export default Application;
