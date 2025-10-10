import React from 'react';
import { useRouter } from "next/router";
import Head from 'next/head';
import Layout from '@/app/layout';


function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>

            </Head>

            <div>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </>
    )
}

export default MyApp;
