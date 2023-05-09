import { Drawer } from 'antd';
import React from 'react';
import styles from './MobileDrawer.module.scss';

export interface MobileDrawerProps {
    closable?: boolean,
    children: React.ReactNode,
    onClose?: () => void
    open?: boolean
}

function MobileDrawer({ children, closable = true, onClose, open = true }: MobileDrawerProps) {
    return <>
        <Drawer
            className={styles.mobileDrawer}
            title={null}
            placement={'bottom'}
            closable={false}
            maskClosable={closable}
            height={'auto'}
            open={open}
            onClose={() => { onClose && onClose() }}
        >
            {closable && <>
                <div className={styles.closeHeader}>
                    <div className={styles.closeIcon} onClick={() => {
                        onClose && onClose()
                    }}>
                        <i className='fa-solid fa-xmark'></i>
                    </div>
                </div>
            </>}

            {children}
        </Drawer>
    </>;
};

export default MobileDrawer;
