import React from 'react';
import styles from './Advertisement.module.scss';
import UserAvatar from '../UserAvatar/UserAvatar';

interface AdvertisementProps {
  ad: any;
}

const Advertisement: React.FC<AdvertisementProps> = ({ ad }) => {
  return (
    <div className={styles.advertisementContainer}>
      {!ad.isEmpty && (
        <div className={styles.sponsorInfo}>
          <div className={styles.sponsorHeader}>
            <UserAvatar src={ad.avatar} className={styles.avatar} />
            <div className={styles.sponsorDesc}>
              <span>is sponsoring this hNFT.</span>
              <a className='bidLink' href={ad.bidPageUrl} target='_blank'>
                Bid on this ad space
              </a>
            </div>
          </div>
          <div className={styles.adSection}>
            <div className={styles.adSectionArrow}></div>
            <div className={styles.adHeader}>{ad.title}</div>
            <div
              className={styles.adContent}
              style={{
                backgroundImage: `url(${ad.posterUrl})`,
              }}
            >
              <div className={styles.adDescription}>
                <div className={styles.infoText}>You will be rewarded</div>
                <div className={styles.rewardAmount}>
                  <UserAvatar src={ad.ad3Icon} className={styles.avatar} />
                  <div className={styles.rewardInfo}>
                    <span>{ad.rewardAmount}</span>
                    <span>{ad.rewardTokenUnit}</span>
                  </div>
                </div>
                <div className={styles.footer}>
                  <div
                    className={`${styles.actionButton} ${styles.left} ${styles.adButton}`}
                    onClick={() => {
                      console.log('claim only')
                    }}
                  >
                    Claim
                  </div>
                  <div
                    className={`${styles.actionButton} ${styles.right} ${styles.adButton}`}
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
        <div className={styles.bidSection}>
          <div className={styles.userInfo}>
            <UserAvatar src={ad.avatar} className={styles.avatar} />
            <div className={styles.daoInfo}>
              <div className={styles.daoInfoText}>
                <div className={styles.userName}>
                  {ad.username}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.help}>
              {ad.username} hNFT is available to be hyperlinked...
            </div>
            <div className={styles.footer}>
              <div
                className={styles.actionButton}
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
