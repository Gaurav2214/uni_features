

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentPortalConfig, getPortalConfigByDomain, deviceType } from '../config/portals';

const PortalContext = createContext();

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};

export const PortalProvider = ({ children, portalConfig: initialPortalConfig }) => {
  const [portalConfig, setPortalConfig] = useState(initialPortalConfig);
  const [isLoading, setIsLoading] = useState(!initialPortalConfig);
  const [deviceType, setDeviceType] = useState("desktop");
  const [pageLabelName, setPageLabelName] = useState("home");

  useEffect(() => {
    const initializePortal = () => {
      if (initialPortalConfig) return;
      try {
        const config = getCurrentPortalConfig();
        setPortalConfig(config);
      } catch (error) {
        console.error('Error initializing portal:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePortal();
  }, [initialPortalConfig]);

  const getPortalConfig = () => portalConfig;
  
  const isFeatureEnabled = (featureName) => {
    return portalConfig?.features?.[featureName] || false;
  };
  
  const getApiUrl = (endpoint) => {
    if (!portalConfig?.api) return null;
    return `${portalConfig.api.baseUrl}${portalConfig.api.endpoints[endpoint] || ''}`;
  };

  const value = {
    portalConfig,
    isLoading,
    getPortalConfig,
    isFeatureEnabled,
    getApiUrl,
    deviceType, setDeviceType, 
    pageLabelName, setPageLabelName,
    portalName: portalConfig?.main?.ET_PORTAL || 'Default Portal',
    theme: portalConfig?.theme || {},
    seo: portalConfig?.seo || {}
  };

  return (
    <PortalContext.Provider value={value}>
      {children}
    </PortalContext.Provider>
  );
}; 