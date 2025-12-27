import React from 'react';
import CredentialItem from '../types/CredentialItem';


const Credential: React.FC<CredentialItem> = (props) => {
  return (
    <a className="cert-container"
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={props.imageSource}
        alt="CERT image"
      />
    </a>
  )
}

export default Credential;