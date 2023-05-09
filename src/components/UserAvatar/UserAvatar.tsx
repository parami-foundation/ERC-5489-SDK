import React from 'react';

export interface UserAvatarProps {
    src?: string;
    className: string;
}

const fallbackSrc = '';

function UserAvatar({ src = fallbackSrc, className }: UserAvatarProps) {
    return <>
        <img src={src} className={className} referrerPolicy="no-referrer" onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackSrc;
        }}></img>
    </>;
};

export default UserAvatar;
