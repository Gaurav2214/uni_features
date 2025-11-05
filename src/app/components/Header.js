import Image from 'next/image';
import React from 'react';
import {portalsLogos} from '../../app/utils/helpers';
import { usePortal } from '../context/PortalContext';

const Header = () => {
    const portalConfig = usePortal();

    return (
        <header>
            <div className="logo">
                <Image width="175"
                    height="66"
                    alt='main logo'
                    src="../logos/uni-logo.svg" />
            </div>
            <div className="sub-head">
                Four Services + One Mission: <span>Empowering global talent</span>
            </div>
            <div className="portals-logo">
                {portalsLogos.map((item) => (
                    <a key={item?.name} href={item?.url} target="_black" className="my-audiowide-text">
                        {/* <Image src={item?.logo} alt={item?.name} width={portalConfig?.deviceType == 'mobile' ? item?.mwidth : item?.width} height="60" /> */}
                        ApplyUni<span>{item?.title}</span>
                    </a>
                ))}
            </div>

        </header>
    )
}

export default Header;
