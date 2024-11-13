import { watch } from 'node:fs';
import path from 'node:path';

// Define the path to the config file
const filePath = path.join(process.cwd(), 'config.yml');

// Watch the config file with debounce
let debounceTimeout: NodeJS.Timeout | null = null;
function watchConfigFile(callback: () => void): void {
  watch(filePath, () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      callback();
    }, 100);
  });
}

export { filePath, watchConfigFile };
