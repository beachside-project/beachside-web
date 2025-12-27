import React from 'react';
import mvpLogo from '../assets/MVP_Logo_Horizontal_Secondary_Blue288_CMYK_72ppi.png';

const Description = () => {
  return (
    <div>
      <p className="description">Hi😀I'm Atsushi YOKOHAMA</p>
      <p>Microsoft MVP for AI Platform</p>
      <p>since 2017</p>
      <a className="cert-container"
        href="https://mvp.microsoft.com/ja-JP/MVP/profile/2c3e3c6b-f35a-e711-8114-3863bb2ed1f8"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="mvp-logo"
          src={mvpLogo}
          alt="CERT image"
        />
      </a>
      <p>I'm Software Developer, Software Architect, Blogger, Speaker.</p>
    </div>
  );
}

export default Description;