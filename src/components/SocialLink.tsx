import React from 'react';
import { FaSquareXTwitter, FaLinkedin, FaGithub, FaSlideshare } from "react-icons/fa6";

const SocialLink = () => {
  return (
    <div className="social-container">
      <a href="https://x.com/BEACH_SIDE" target="_blank" rel="noopener noreferrer">
        <FaSquareXTwitter size="3rem" />
      </a>
      <a href="https://github.com/beachside-project" target="_blank" rel="noopener noreferrer">
        <FaGithub size="3rem" />
      </a>
      <a href="https://www.linkedin.com/in/atsushi-yokohama/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size="3rem" />
      </a>
      <a href="https://www.slideshare.net/ATSUSHIYOKOHAMA" target="_blank" rel="noopener noreferrer">
        <FaSlideshare size="3rem" />
      </a>
    </div>
  )
}

export default SocialLink;
