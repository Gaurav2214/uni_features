// Portal configuration for multi-tenant setup
export const PORTAL_CONFIG = {
    'unifeatures.com': {
      name: 'UniFeatures',
      theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        logo: '/logos/uni-logo.svg',
        favicon: '/favicons/favicon.ico'
      },
      features: {
        showAds: true,
        slimHeader: false,
      },
      seo: {
        title: 'UniFeatures | Your Trusted Educational Consultant',
        description: 'UniFeatures offers expert guidance for students seeking higher education opportunities in all over globe. From personalized course advice to application assistance, we help you navigate your academic journey with ease.',
        keywords: 'educational consultant India, Hyderabad, study abroad advice, university application assistance, student counseling services, higher education guidance, UniFeatures'
      },
      api: {
        baseUrl: 'https://unifeatures.com',
        endpoints: {
          products: '/products',
          categories: '/categories'
        }
      }
    },
    'applyunihomes.com': {
      name: 'ApplyUniHomes',
      theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        logo: '/logos/homes-logo.svg',
        favicon: '/favicons/favicon.ico'
      },
      features: {
        showAds: true,
        slimHeader: false,
      },
      seo: {
        title: 'ApplyUniHomes | Student Housing Solutions Near Your University',
        description: 'Find affordable and convenient student housing options near your university with ApplyUniHomes. Browse verified listings, compare prices, and secure your ideal accommodation hassle-free.',
        keywords: 'student housing, university accommodations, student apartments, campus housing, off-campus housing, student rentals, university dorms, student living near university'
      },
      api: {
        baseUrl: 'https://applyunihomes.com',
        endpoints: {
          products: '/products',
          categories: '/categories'
        }
      }
    },
    'applyunijobs.com': {
      name: 'ApplyUniJobs',
      theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        logo: '/logos/jobs-logo.svg',
        favicon: '/favicons/favicon.ico'
      },
      features: {
        showAds: true,
        slimHeader: false,
      },
      seo: {
        title: 'ApplyUniJobs | University Student Job Portal',
        description: 'Discover part-time, internship, and full-time job opportunities tailored for university students. ApplyUniJobs connects students with employers seeking academic-driven talent.',
        keywords: 'university student jobs, student internships, part-time jobs for students, campus employment, student job portal, academic internships, university career opportunities'
      },
      api: {
        baseUrl: 'https://applyunijobs.com/',
        endpoints: {
          products: '/products',
          categories: '/categories'
        }
      }
    },
    'applyuniloans.com': {
      name: 'ApplyUniLoans',
      theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        logo: '/logos/loans-logo.svg',
        favicon: '/favicons/favicon.ico'
      },
      features: {
        showAds: true,
        slimHeader: false,
      },
      seo: {
        title: 'ApplyUniLoans | Hassle-Free Education Loans for Studying Abroad',
        description: 'Get easy and quick education loans for studying abroad with ApplyUniLoans. Compare lenders, check eligibility, and secure your student loan with expert guidance — all in one place.',
        keywords: 'education loan, student loan, study abroad loan, overseas education finance, university loan, student financial aid, apply for education loan, study loan India, loan for international students'
      },
      api: {
        baseUrl: 'https://applyuniloans.com/',
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
        baseUrl: process.env.LOCAL_API_URL || 'http://localhost:3000',
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
  
  