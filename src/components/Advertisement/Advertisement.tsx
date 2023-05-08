import React from 'react';
import './Advertisement.scss';
import UserAvatar from '../UserAvatar/UserAvatar';

interface AdvertisementProps {
  ad: any;
}

const Advertisement: React.FC<AdvertisementProps> = ({ ad }) => {
  return (
    <div className='advertisement-container'>
      {!ad.isEmpty && (
        <div className='sponsor-info'>
          <div className='sponsor-header'>
            <UserAvatar src={ad.avatar} className='avatar' />
            <div className='sponsor-desc'>
              <span>is sponsoring this hNFT.</span>
              <a className='bidLink' href={ad.bidPageUrl} target='_blank'>
                Bid on this ad space
              </a>
            </div>
          </div>
          <div className='ad-section'>
            <div className='ad-section-arrow'></div>
            <div className='ad-header'>{ad.title}</div>
            <div
              className='ad-content'
              style={{
                backgroundImage: `url(${ad.posterUrl})`,
              }}
            >
              <div className='ad-description'>
                <div className='info-text'>You will be rewarded</div>
                <div className='reward-amount'>
                  <UserAvatar src={ad.ad3Icon} className='avatar' />
                  <div className='reward-info'>
                    <span className='reward-number'>{ad.rewardAmount}</span>
                    <span className='reward-token'>{ad.rewardTokenUnit}</span>
                  </div>
                </div>
                <div className='footer'>
                  <div
                    className='action-button left ad-button'
                    onClick={() => {
                      console.log('claim only')
                    }}
                  >
                    Claim
                  </div>
                  <div
                    className='action-button right ad-button'
                    onClick={() => {
                      console.log('claim and learn more')
                      window.open(ad.link, '_blank');
                    }}
                  >
                    Claim & Learn more
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!!ad.isEmpty && (
        <div className='bid-section'>
          <div className='user-info'>
            <UserAvatar src={ad.avatar} className='avatar' />
            <div className='dao-info'>
              <div className='dao-info-text'>
                <div className='user-name'>
                  {ad.username}
                </div>
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='help'>
              {ad.username} hNFT is available to be hyperlinked...
            </div>
            <div className='footer'>
              <div
                className='action-button'
                onClick={() => {
                  window.open(ad.bidPageUrl, '_blank');
                }}
              >
                Bid Hyperlink Slot
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advertisement;
