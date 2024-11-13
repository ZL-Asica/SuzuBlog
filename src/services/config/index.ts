import { readFileSync } from 'node:fs';

import yaml from 'yaml';

import { filePath, watchConfigFile } from '@/services/config/fileUtils';

let cachedConfig: Config | null = null;

// Listen for changes to the config file and clear cache on change
watchConfigFile(() => {
  cachedConfig = null;
});

export const getConfig = (): Config => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const fileContents = readFileSync(filePath, 'utf8');
  const parsedConfig = yaml.parse(fileContents) as Config;

  // Validate the config format
  if (!parsedConfig) {
    throw new Error('Invalid config format');
  }

  cachedConfig = parsedConfig;
  return cachedConfig;
};
