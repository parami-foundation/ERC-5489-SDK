import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import Advertisement from '../Advertisement/Advertisement';
import { fetchAdDataByImageUrl } from '../../services/hnft.service';
import HeartIcon from '../HeartIcon/HeartIcon';
import { isMobile } from 'react-device-detect';
import MobileDrawer from '../MobileDrawer/MobileDrawer';
import PropTypes from "prop-types"
import styles from './HnftBadge.module.scss';

export interface HnftBadgeProps {
    imageurl: string;
}

function HnftBadge({ imageurl }: HnftBadgeProps) {
    const [adData, setAdData] = useState<any>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        fetchAdDataByImageUrl(imageurl).then(ad => {
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
                    content={<Advertisement ad={adData} />}
                >
                    {adData.isEmpty && <>
                        <div className={`${styles.hnftBadge} ${styles.default}`}>
                            <div className={`${styles.iconContainer}`}>
                                <HeartIcon></HeartIcon>
                            </div>
                        </div>
                    </>}
                    {!adData.isEmpty && <>
                        <div className={`${styles.hnftBadge}`} style={{
                            backgroundImage: `url(${adData.avatar})`,
                        }}></div>
                    </>}
                </Popover>
            </>}

            {isMobile && <>
                {adData.isEmpty && <>
                    <div className={`${styles.hnftBadge} ${styles.default}`} onClick={() => { setIsDrawerOpen(true) }}>
                        <div className={`${styles.iconContainer}`}>
                            <HeartIcon></HeartIcon>
                        </div>
                    </div>
                </>}
                {!adData.isEmpty && <>
                    <div className={`${styles.hnftBadge}`} style={{
                        backgroundImage: `url(${adData.avatar})`,
                    }} onClick={() => { setIsDrawerOpen(true) }}></div>
                </>}
                <MobileDrawer open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false) }}>
                    <Advertisement ad={adData} />
                </MobileDrawer>
            </>}
        </>}
    </>;
};

HnftBadge.propTypes = {
    imageurl: PropTypes.string.isRequired
}

export default HnftBadge;
