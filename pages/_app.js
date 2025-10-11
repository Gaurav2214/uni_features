import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import Layout from '@/app/Layout';
import Link from 'next/link';
import ErrorBoundary from '@/app/components/ErrorBoundary';
import { PortalProvider, usePortal } from '../src/app/context/PortalContext';
import { getPortalConfigByDomain } from '../src/app/config/portals';
import PortalWrapper from "@/app/components/PortalWrapper";
import "../src/styles/globals.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
  });



const PageLabelUpdater = () => {
    const { setDeviceType, setPageLabelName } = usePortal();
    const router = useRouter();

    useEffect(() => {
        const updateDeviceType = () => {
            setDeviceType(window.innerWidth >= 1000 ? 'desktop' : 'mobile');
        };

        updateDeviceType(); // Initial check
        window.addEventListener("resize", updateDeviceType);
        return () => window.removeEventListener("resize", updateDeviceType);
    }, [setDeviceType]);

    const transformedPath = (path) => path.replace(/^\//, '').replace('/', '-');

    useEffect(() => {
        let label = "homepage";
        if (router.pathname !== '/') {
            label = transformedPath(router.pathname);
        }
        setPageLabelName(label);
        document.querySelector('body')?.attributes?.class ? document.querySelector('body')?.attributes?.removeNamedItem('class') : '';
        document.querySelector('body')?.classList?.add(label);
    }, [router.pathname, setPageLabelName]);

    return null;
};

function MyApp({ Component, pageProps, portalConfig }) {
    return (
        <>
            <PortalProvider portalConfig={portalConfig}>
                <ErrorBoundary>
                    <Head>
                        <title>UniFeature</title>
                        {/* <link rel="shortcut icon" type="image/x-icon" href="/src/app/favicon.ico" /> */}
                    </Head>

                    <div className={`app-container`}>
                        <PortalWrapper>
                            <PageLabelUpdater />
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </PortalWrapper>
                    </div>
                </ErrorBoundary>
            </PortalProvider>
        </>
    )
}

export default MyApp;
