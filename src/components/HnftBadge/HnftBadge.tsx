import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import Advertisement from '../Advertisement/Advertisement';
import { AdData, fetchAdDataByHnft } from '../../services/hnft.service';
import HeartIcon from '../HeartIcon/HeartIcon';
import { isMobile } from 'react-device-detect';
import MobileDrawer from '../MobileDrawer/MobileDrawer';
import PropTypes from "prop-types"
import styles from './HnftBadge.module.scss';

export interface HnftBadgeProps {
    hnftImageUrl: string;
    hnftContractAddress?: string;
    hnftTokenId?: number;
    darkMode?: boolean;
}

function HnftBadge({ hnftImageUrl, hnftContractAddress, hnftTokenId, darkMode = false }: HnftBadgeProps) {
    const [adData, setAdData] = useState<AdData | null>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        fetchAdDataByHnft({ hnftImageUrl, hnftAddress: hnftContractAddress, tokenId: hnftTokenId }).then(ad => {
            setAdData(ad);
        })
    }, []);

    return <>
        {adData && adData.hnftTokenUri && <>
            {!isMobile && <>
                <Popover
                    arrow={false}
                    overlayInnerStyle={{
                        boxShadow: 'none',
                        padding: 0,
                        backgroundColor: 'transparent',
                    }}
                    placement='topLeft'
                    content={<Advertisement ad={adData} hnftImageUrl={hnftImageUrl} darkMode={darkMode} />}
                >
                    {!adData.adMetaData && <>
                        <div className={`${styles.hnftBadge} ${styles.default}`}>
                            <div className={`${styles.iconContainer}`}>
                                <HeartIcon></HeartIcon>
                            </div>
                        </div>
                    </>}
                    {adData.adMetaData && <>
                        <div className={`${styles.hnftBadge}`} style={{
                            backgroundImage: `url(${adData.adMetaData.icon})`,
                        }}></div>
                    </>}
                </Popover>
            </>}

            {isMobile && <>
                {!adData.adMetaData && <>
                    <div className={`${styles.hnftBadge} ${styles.default}`} onClick={() => { setIsDrawerOpen(true) }}>
                        <div className={`${styles.iconContainer}`}>
                            <HeartIcon></HeartIcon>
                        </div>
                    </div>
                </>}
                {adData.adMetaData && <>
                    <div className={`${styles.hnftBadge}`} style={{
                        backgroundImage: `url(${adData.adMetaData.icon})`,
                    }} onClick={() => { setIsDrawerOpen(true) }}></div>
                </>}
                <MobileDrawer open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false) }} darkMode={darkMode} >
                    <Advertisement ad={adData} hnftImageUrl={hnftImageUrl} darkMode={darkMode} />
                </MobileDrawer>
            </>}
        </>}
    </>;
};

HnftBadge.propTypes = {
    hnftImageUrl: PropTypes.string.isRequired,
    hnftContractAddress: PropTypes.string,
    hnftTokenId: PropTypes.number,
    darkMode: PropTypes.bool
}

export default HnftBadge;
