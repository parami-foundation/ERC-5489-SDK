import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import './HnftBadge.scss';
import Advertisement from '../Advertisement/Advertisement';
import { fetchAdDataByImageUrl } from '../../services/hnft.service';
import HeartIcon from '../HeartIcon/HeartIcon';
import { isMobile } from 'react-device-detect';
import MobileDrawer from '../MobileDrawer/MobileDrawer';

export interface HnftBadgeProps {
    imageUrl: string;
}

function HnftBadge({ imageUrl }: HnftBadgeProps) {
    const [adData, setAdData] = useState<any>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        fetchAdDataByImageUrl(imageUrl).then(ad => {
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
                        <div className='hnft-badge default'>
                            <div className='icon-container'>
                                <HeartIcon></HeartIcon>
                            </div>
                        </div>
                    </>}
                    {!adData.isEmpty && <>
                        <div className={`hnft-badge`} style={{
                            backgroundImage: `url(${adData.avatar})`,
                        }}></div>
                    </>}
                </Popover>
            </>}

            {isMobile && <>
                {adData.isEmpty && <>
                    <div className='hnft-badge default' onClick={() => { setIsDrawerOpen(true) }}>
                        <div className='icon-container'>
                            <HeartIcon></HeartIcon>
                        </div>
                    </div>
                </>}
                {!adData.isEmpty && <>
                    <div className={`hnft-badge`} style={{
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

export default HnftBadge;
