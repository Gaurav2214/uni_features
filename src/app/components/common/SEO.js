// src/app/components/SEO.js
import Head from "next/head";

const SEO = ({ title, description, keywords, favicon }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="shortcut icon" type="image/x-icon" href={favicon} />
    </Head>
  );
}

export default SEO;
