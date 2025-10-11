

import { useEffect, useState } from 'react';
import { getCurrentPortalConfig } from '../config/portals';

export default function PortalWrapper({ children }) {
  const [portalConfig, setPortalConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePortal = () => {
      try {
        const config = getCurrentPortalConfig();
        setPortalConfig(config);
        
        // Apply portal-specific theme
        if (config.theme) {
          document.documentElement.style.setProperty('--primary-color', config.theme.primaryColor);
          document.documentElement.style.setProperty('--secondary-color', config.theme.secondaryColor);
        }
        
        // Update favicon
        if (config.theme?.favicon) {
          const favicon = document.querySelector('link[rel="icon"]');
          if (favicon) {
            favicon.href = config.theme.favicon;
          }
        }
        
        // Update page title
        if (config.seo?.title) {
          document.title = config.seo.title;
        }
        
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.name = 'description';
          document.head.appendChild(metaDescription);
        }
        if (config.seo?.description) {
          metaDescription.setAttribute('content', config.seo.description);
        }
        
        // Update meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.name = 'keywords';
          document.head.appendChild(metaKeywords);
        }
        if (config.seo?.keywords) {
          metaKeywords.setAttribute('content', config.seo.keywords);
        }
        
      } catch (error) {
        console.error('Error initializing portal:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePortal();
  }, []);

  return (
    <>
      {children}
    </>
  );
}
