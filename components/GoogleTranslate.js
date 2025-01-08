// pages/index.js or any component where you want the translate button
import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Load the Google Translate script with a different source
    const script = document.createElement('script');
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="google_translate_element" style={{ display: 'none' }} />
  );
};

export default GoogleTranslate;
