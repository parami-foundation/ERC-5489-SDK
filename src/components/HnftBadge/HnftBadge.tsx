import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import Advertisement from '../Advertisement/Advertisement';
import { AdData, fetchAdDataByImageUrl } from '../../services/hnft.service';
import HeartIcon from '../HeartIcon/HeartIcon';
import { isMobile } from 'react-device-detect';
import MobileDrawer from '../MobileDrawer/MobileDrawer';
import PropTypes from "prop-types"
import styles from './HnftBadge.module.scss';

export interface HnftBadgeProps {
    hnftImageUrl: string;
    hnftContractAddress?: string;
    hnftTokenId?: number;
}

function HnftBadge({hnftImageUrl, hnftContractAddress, hnftTokenId}: HnftBadgeProps) {
    const [adData, setAdData] = useState<AdData | null>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        fetchAdDataByImageUrl({hnftImageUrl, hnftContractAddress, hnftTokenId}).then(ad => {
            setAdData(ad);
        })
    }, []);

    return <>
        {adData && <>
            {!isMobile && <>
                <Popover
                    arrow={false}
                    overlayInnerStyle={{
                        boxShadow: 'none',
                        padding: 0,
                        backgroundColor: 'transparent',
                    }}
                    placement='topLeft'
                    content={<Advertisement ad={adData} hnftImageUrl={hnftImageUrl} />}
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
                <MobileDrawer open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false) }}>
                    <Advertisement ad={adData} hnftImageUrl={hnftImageUrl} />
                </MobileDrawer>
            </>}
        </>}
    </>;
};

HnftBadge.propTypes = {
    imageurl: PropTypes.string.isRequired
}

export default HnftBadge;
