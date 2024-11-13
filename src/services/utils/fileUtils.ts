import { watch } from 'node:fs';
import path from 'node:path';

// Define the path to the config file
const filePath = path.join(process.cwd(), 'config.yml');

// Watch the config file with debounce
function watchConfigFile(callback: () => void): void {
  let debounceTimeout: NodeJS.Timeout | null = null;

  watch(filePath, () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    // Set debounce delay to 100ms
    debounceTimeout = setTimeout(callback, 100);
  });
}

export { filePath, watchConfigFile };
