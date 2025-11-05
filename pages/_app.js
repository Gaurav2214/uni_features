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
import { Poppins, Audiowide } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
});

const audiowide = Audiowide({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-audiowide",
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
                        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                        <meta name="robots" content="index, follow" />
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                                <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
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
