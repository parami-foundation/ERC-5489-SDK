import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import './HnftBadge.scss';
import Advertisement from '../Advertisement/Advertisement';
import { fetchAdDataByImageUrl } from '../../services/hnft.service';
import HeartIcon from '../HeartIcon/HeartIcon';

export interface HnftBadgeProps {
    imageUrl: string;
}

function HnftBadge({ imageUrl }: HnftBadgeProps) {
    const [adData, setAdData] = useState<any>();

    useEffect(() => {
        fetchAdDataByImageUrl(imageUrl).then(ad => {
            setAdData(ad);
        })
    }, []);

    return <>
        {adData && <>
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
    </>;
};

export default HnftBadge;
