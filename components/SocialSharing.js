
// components/SocialSharing.js
import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
import styles from '../styles/SocialSharing.module.css';

const SocialSharing = ({ title, image1 }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className={styles.socialContainer}>
      <FacebookShareButton
        url={currentUrl}
        quote={title} // Share the title
        className={styles.shareButton}
      >
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      
      <WhatsappShareButton
        url={currentUrl}
        title={title} // Share the title
        className={styles.shareButton}
      >
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
      
      <TwitterShareButton
        url={currentUrl}
        title={title} // Share the title
        className={styles.shareButton}
      >
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      
      <LinkedinShareButton
        url={currentUrl}
        title={title} // Share the title
        className={styles.shareButton}
      >
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
      
      <TelegramShareButton
        url={currentUrl}
        title={title} // Share the title
        className={styles.shareButton}
      >
        <TelegramIcon size={40} round />
      </TelegramShareButton>
      
      <EmailShareButton
        url={currentUrl}
        subject={title} // Share the title
        className={styles.shareButton}
      >
        <EmailIcon size={40} round />
      </EmailShareButton>
    </div>
  );
};

export default SocialSharing;

