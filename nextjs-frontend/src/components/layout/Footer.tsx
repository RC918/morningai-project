'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface VersionInfo {
  version: string;
  buildId: string;
  timestamp: string;
  environment: string;
  phase: string;
}

export function Footer() {
  const t = useTranslations('footer');
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    fetch('/api/version')
      .then(res => res.json())
      .then(data => setVersionInfo(data))
      .catch(console.error);
  }, []);

  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 MorningAI. All rights reserved.
          </div>
          
          {versionInfo && (
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <span>{t('version')}:</span>
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {versionInfo.version}
                </code>
              </div>
              
              <div className="flex items-center space-x-2">
                <span>{t('buildId')}:</span>
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {versionInfo.buildId.substring(0, 8)}
                </code>
              </div>
              
              <div className="flex items-center space-x-2">
                <span>{t('lastUpdated')}:</span>
                <time className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {new Date(versionInfo.timestamp).toLocaleString()}
                </time>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

