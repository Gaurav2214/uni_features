
import SEO from '@/app/components/common/SEO';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import { getPortalConfigByDomain } from '@/app/config/portals';
import { usePortal } from '@/app/context/PortalContext';
import React, { useEffect } from 'react';
import EnquiryForm from '@/app/components/EnquiryForm';


const Home = ({ seo, themes }) => {
  const {
    portalConfig,
    portalName,
    theme,
    isFeatureEnabled,
    getApiUrl,
    isLoading
  } = usePortal();

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        favicon={themes.favicon}
      />
      
      <div className='container'>
        <Header />
        <EnquiryForm />
        <Footer />
      </div>
      
    </>
  )
}

export async function getServerSideProps({ req }) {
  // console.log(req);
  let host = req.headers.host;
  host = host.split(':')[0];
  const portalConfig = getPortalConfigByDomain(host);

  return {
    props: {
      seo: portalConfig?.seo,
      themes: portalConfig?.theme,
    },
  };
}

export default Home;
