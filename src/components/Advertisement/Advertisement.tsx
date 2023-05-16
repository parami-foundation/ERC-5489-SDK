import React from 'react';
import styles from './Advertisement.module.scss';
import UserAvatar from '../UserAvatar/UserAvatar';
import { AdData } from '../../services/hnft.service';

interface AdvertisementProps {
  ad: AdData;
  hnftImageUrl: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({ ad, hnftImageUrl }) => {
  return (
    <div className={styles.advertisementContainer}>
      {ad.adMetaData && (
        <div className={styles.sponsorInfo}>
          <div className={styles.sponsorHeader}>
            <UserAvatar src={ad.adMetaData.icon} className={styles.avatar} />
            <div className={styles.sponsorDesc}>
              <span>is sponsoring this hNFT.</span>
              {/* todo: open bid url with params */}
              <a className={styles.bidLink} href={ad.bidPageUrl} target='_blank'>
                Bid on this ad space
              </a>
            </div>
          </div>
          <div className={styles.adSection}>
            <div className={styles.adSectionArrow}></div>
            <div className={styles.adHeader}>{ad.adMetaData.title}</div>
            <div
              className={styles.adContent}
              style={{
                backgroundImage: `url(${ad.adMetaData.poster})`,
              }}
            >
              <div className={styles.adDescription}>
                <div className={styles.infoText}>You will be rewarded</div>
                <div className={styles.rewardAmount}>
                  <UserAvatar src={ad.adMetaData.rewardTokenIcon} className={styles.avatar} />
                  <div className={styles.rewardInfo}>
                    <span>{ad.adMetaData.rewardAmount}</span>
                    <span>{ad.adMetaData.rewardTokenUnit}</span>
                  </div>
                </div>
                <div className={styles.footer}>
                  <div
                    className={`${styles.actionButton} ${styles.left} ${styles.adButton}`}
                    onClick={() => {
                      // todo: claim
                      console.log('claim only')
                    }}
                  >
                    Claim
                  </div>
                  <div
                    className={`${styles.actionButton} ${styles.right} ${styles.adButton}`}
                    onClick={() => {
                      // todo: claim
                      console.log('claim and learn more')
                      window.open(ad.adMetaData!.url, '_blank');
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

      {!ad.adMetaData && (
        <div className={styles.bidSection}>
          <div className={styles.userInfo}>
            <UserAvatar src={hnftImageUrl} className={styles.avatar} />
            <div className={styles.daoInfo}>
              <div className={styles.daoInfoText}>
                <div className={styles.userName}>
                  {/* todo: nft owner name */}
                  Hyperlink NFT # {ad.hnftTokenId}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.help}>
              hNFT is available to be hyperlinked...
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
