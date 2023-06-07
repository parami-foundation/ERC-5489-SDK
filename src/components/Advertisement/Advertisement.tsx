import React from 'react';
import styles from './Advertisement.module.scss';
import UserAvatar from '../UserAvatar/UserAvatar';
import { AdData } from '../../services/hnft.service';

interface AdvertisementProps {
  ad: AdData;
  hnftImageUrl: string;
  darkMode: boolean;
}

const Advertisement: React.FC<AdvertisementProps> = ({ ad, hnftImageUrl, darkMode }) => {
  const bidUrl = `${ad.bidPageUrl}?hnftAddress=${ad.hnftContractAddress}&tokenId=${ad.hnftTokenId}`;

  const openClaimPopup = () => {
    window.open(`${ad.claimPageUrl}?bidId=${ad.bidId}&tags=${ad.adMetaData?.tag}`, "claimAdWindow", "popup,width=400,height=600");
  }

  const tokenPriceUp = Number(ad.governanceTokenInfo?.priceInfo?.priceChange ?? '0') >= 0;

  return (
    <div className={`${styles.advertisementContainer} ${darkMode ? styles.dark : ''}`}>
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
            {ad.governanceTokenInfo?.priceInfo && <>
              <div className={`${styles.tokenPriceInfo}`}>
                <span className={styles.price}>
                  <span className={styles.value}>{Number(ad.governanceTokenInfo.priceInfo.price).toFixed(2)}</span>
                  <span className={styles.symbol}>{ad.governanceTokenInfo.priceInfo.symbol}</span>
                </span>
                <span className={`${styles.priceChange} ${tokenPriceUp ? styles.priceUp : styles.priceDown}`}>
                  <span className={styles.arrowIcon}>
                    {tokenPriceUp && <>
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.338272 5.50974L3.12842 0.549468C3.51073 -0.130184 4.48927 -0.130183 4.87158 0.549469L7.66173 5.50974C8.03669 6.17634 7.55498 7 6.79015 7H1.20985C0.445021 7 -0.0366924 6.17634 0.338272 5.50974Z" fill="white" />
                      </svg>
                    </>}

                    {!tokenPriceUp && <>
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.41173 1.49026L5.62158 6.45053C5.23927 7.13018 4.26073 7.13018 3.87842 6.45053L1.08827 1.49026C0.713308 0.823656 1.19502 -7.04189e-07 1.95985 -6.37325e-07L7.54015 -1.4948e-07C8.30498 -8.26164e-08 8.78669 0.823658 8.41173 1.49026Z" fill="white" />
                      </svg>
                    </>}
                  </span>
                  {tokenPriceUp && '+'}
                  {ad.governanceTokenInfo.priceInfo.priceChange}%
                </span>
              </div>
            </>}
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
