import React from 'react';
import Image from 'next/image';
import { footerConnect, footerLinks, footFeatures } from '../utils/helpers';

const Footer = () => {
    return (
        <footer>
            <div className="footer-features">
                {footFeatures.map((item, index) => (
                    <div key={item?.title+'_'+index} className='fitem'>
                        <Image src={item?.icon} alt={item?.desc1} width="32" height="32" />
                        <div className='contn'>
                            <p>{item?.title}</p>
                            <p>{item?.desc1}</p>
                            <p>{item?.desc2}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='footer-links'>
                {footerLinks.map((item, index) => (
                    <a key={'link_'+index} href={item?.link}>{item.name}</a>
                ))}
            </div>
            <div className='footer-connect'>
                {footerConnect.map((item) => (
                    <div key={item}>{item}</div>
                ))}
            </div>
            <div className='tag_line'>Crafted by AUN Tech Consulting Pvt. Ltd.</div>
        </footer>
    )
}

export default Footer;
