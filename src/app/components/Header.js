import Image from 'next/image';
import React from 'react';
import {portalsLogos} from '../../app/utils/helpers';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <Image width="175"
                    height="66"
                    src="../logos/uni-logo.svg" />
            </div>
            <div className="sub-head">
                Four Services + One Mission: <span>Empowering global talent</span>
            </div>
            <div className="portals-logo">
                {portalsLogos.map((item) => (
                    <a key={item?.name} href={item?.url} target="_black">
                        <Image src={item?.logo} alt={item?.name} width={item?.width} height="60" />
                    </a>
                ))}
            </div>

        </header>
    )
}

export default Header;
