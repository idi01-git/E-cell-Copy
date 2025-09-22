"use client";

import React from 'react';
import { logger } from '@/lib/logger';
import { SEO_CONSTANTS } from '@/lib/seo';

export function ClientInit() {
  React.useEffect(() => {
    // Set up client-side logging context
    logger.setContext("application", {
      name: SEO_CONSTANTS.SITE_NAME,
      version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
      environment: process.env.NODE_ENV,
      buildTime: new Date().toISOString(),
    });

    // Set application tags
    logger.setTag("component", "client_init");
    logger.setTag("page_type", "layout");
    
    logger.info('Client-side initialization complete');
  }, []);

  // This component doesn't render anything visible
  return null;
}
