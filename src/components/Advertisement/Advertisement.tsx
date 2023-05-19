import React from 'react';
import styles from './Advertisement.module.scss';
import UserAvatar from '../UserAvatar/UserAvatar';
import { AdData } from '../../services/hnft.service';

interface AdvertisementProps {
  ad: AdData;
  hnftImageUrl: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({ ad, hnftImageUrl }) => {
  const bidUrl = `${ad.bidPageUrl}?hnftAddress=${ad.hnftContractAddress}&tokenId=${ad.hnftTokenId}`;

  const openClaimPopup = () => {
    window.open(`${ad.claimPageUrl}?bidId=${ad.bidId}&tags=${ad.adMetaData?.tag}`, "claimAdWindow", "popup,width=400,height=600");
  }

  return (
    <div className={styles.advertisementContainer}>
      {ad.adMetaData && (
        <div className={styles.sponsorInfo}>
          <div className={styles.sponsorHeader}>
            <UserAvatar src={ad.adMetaData.icon} className={styles.avatar} />
            <div className={styles.sponsorDesc}>
              <span>is sponsoring this hNFT.</span>
              <a className={styles.bidLink} href={bidUrl} target='_blank'>
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
                    {!!ad.adMetaData.rewardAmount && <>
                      <span>{ad.adMetaData.rewardAmount}</span>
                    </>}
                    {!!ad.adMetaData.rewardTokenUnit && <>
                      <span>{ad.adMetaData.rewardTokenUnit}</span>
                    </>}
                  </div>
                </div>
                <div className={styles.footer}>
                  <div
                    className={`${styles.actionButton} ${styles.left} ${styles.adButton}`}
                    onClick={() => {
                      openClaimPopup();
                    }}
                  >
                    Claim
                  </div>
                  <div
                    className={`${styles.actionButton} ${styles.right} ${styles.adButton}`}
                    onClick={() => {
                      window.open(ad.adMetaData!.url, '_blank');
                      openClaimPopup();
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
                  window.open(bidUrl, '_blank');
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
