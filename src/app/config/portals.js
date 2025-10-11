// Portal configuration for multi-tenant setup
export const PORTAL_CONFIG = {
    'unifeatures.com': {
      name: 'Auto Portal',
      theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        logo: '/logos/auto-logo.svg',
        favicon: '/favicons/favicon.ico'
      },
      features: {
        showAds: true,
        slimHeader: false,
      },
      seo: {
        title: 'Auto Portal - Your Auto Solutions',
        description: 'Find the best auto solutions and services',
        keywords: 'auto, cars, vehicles, automotive'
      },
      api: {
        baseUrl: process.env.AUTO_API_URL || 'https://api.auto.com',
        endpoints: {
          products: '/products',
          categories: '/categories'
        }
      }
    },
  
    // Localhost development domains
    'localhost': {
      main: {
        ET_PORTAL: 'localhost',
      },
      name: 'Local Development Portal',
      theme: {
        primaryColor: '#dc2626',
        secondaryColor: '#991b1b',
        logo: '/logos/local-logo.svg',
        favicon: '/favicons/favicon.ico'
      },
      features: {
        showAds: true,
        slimHeader: false,
      },
      seo: {
        title: 'Local Development - Multi-Portal Test',
        description: 'Local development environment for testing multi-portal setup',
        keywords: 'development, test, local'
      },
      api: {
        baseUrl: process.env.LOCAL_API_URL || 'http://localhost:3001',
        endpoints: {
          products: '/api/products',
          categories: '/api/categories'
        }
      }
    }
  };
  
  // Default portal configuration
  export const DEFAULT_PORTAL = 'localhost';
  
  // Helper function to extract portal name from hostname
  export const extractPortalName = (hostname) => {
    // Remove www. if present
    let cleanHostname = hostname.replace(/^www\./, '');
    
    return cleanHostname;
  };
  
  // Helper function to get current portal config
  export const getCurrentPortalConfig = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      // First try to get exact match from PORTAL_CONFIG
      if (PORTAL_CONFIG[hostname]) {
        return PORTAL_CONFIG[hostname];
      }
      
      // Extract portal name from hostname
      const portalName = extractPortalName(hostname);
      
      // Create dynamic config based on portal name
      const dynamicConfig = {
        main: {
          ET_PORTAL: portalName,
        },
        name: `${portalName.charAt(0).toUpperCase() + portalName.slice(1)} Portal`,
        theme: {
          primaryColor: '#2563eb', // Default blue theme
          secondaryColor: '#1e40af',
          logo: `/logos/${portalName}-logo.svg`,
          favicon: `/favicons/${portalName}-favicon.ico`
        },
        features: {
          showAds: true,
          slimHeader: false,
        },
        seo: {
          title: `${portalName.charAt(0).toUpperCase() + portalName.slice(1)} Portal`,
          description: `${portalName.charAt(0).toUpperCase() + portalName.slice(1)} portal description`,
          keywords: portalName
        },
        api: {
          baseUrl: process.env[`${portalName.toUpperCase()}_API_URL`] || `https://api.${portalName}.com`,
          endpoints: {
            products: '/products',
            categories: '/categories'
          }
        }
      };
      
      return dynamicConfig;
    }
    return PORTAL_CONFIG[DEFAULT_PORTAL];
  };
  
  // Helper function to get portal config by domain
  export const getPortalConfigByDomain = (domain) => {
    return PORTAL_CONFIG[domain] || PORTAL_CONFIG[DEFAULT_PORTAL];
  };
  
  // Helper function to check if feature is enabled for current portal
  export const isFeatureEnabled = (featureName) => {
    const config = getCurrentPortalConfig();
    return config.features[featureName] || false;
  }; 
  
  