import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { AdData, fetchAdDataByHnft } from '../../services/hnft.service';
import HeartIcon from '../HeartIcon/HeartIcon';
import { isMobile } from 'react-device-detect';
import MobileDrawer from '../MobileDrawer/MobileDrawer';
import PropTypes from "prop-types"
import styles from './HnftBadge.module.scss';
import Chatbot from '../Chatbot/Chatbot';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';

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
        <DynamicContextProvider
            settings={{
                environmentId: '6b6e3b91-f00e-4339-b1a4-a589ae64291b',
            }}>
            {adData && adData.character && <>
                {!isMobile && <>
                    <Popover
                        arrow={false}
                        overlayInnerStyle={{
                            boxShadow: 'none',
                            padding: 0,
                            backgroundColor: 'transparent',
                        }}
                        placement='topLeft'
                        trigger='click'
                        content={<Chatbot character={adData.character}></Chatbot>}
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
                        <Chatbot character={adData.character}></Chatbot>
                    </MobileDrawer>
                </>}
            </>}
        </DynamicContextProvider>
    </>;
};

HnftBadge.propTypes = {
    hnftImageUrl: PropTypes.string.isRequired,
    hnftContractAddress: PropTypes.string,
    hnftTokenId: PropTypes.number,
    darkMode: PropTypes.bool
}

export default HnftBadge;
