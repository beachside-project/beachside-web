import Credential from './Credential';
import CredentialItem from '../types/CredentialItem';
import React from 'react';

type CredentialLineProps = {
  items: CredentialItem[]
}


const CredentialLine: React.FC<CredentialLineProps> = (props) => {
  return (
    <div className="cerds-line-container">
      {props.items.map((item: CredentialItem) => {
        return (
          <Credential key={item.url} imageSource={item.imageSource} url={item.url} />
        );
      })}
    </div>
  )

}

export default CredentialLine;
