"use client";

import { useEffect } from 'react';

const CopyProtection = () => {
  useEffect(() => {
    const handleCopy = (copyEvent: ClipboardEvent) => {
      const selection = globalThis.getSelection();
      if (!selection) return;

      const selectedText = selection.toString();
      const threshold = 10;

      if (selectedText.length >= threshold) {
        copyEvent.preventDefault();

        const currentPageURL = globalThis.location.href;
        const copyrightNotice = `该内容著作权归下述网站链接主体所有。\n链接：${currentPageURL}\n\n`;

        const modifiedText = `${copyrightNotice}${selectedText}`;

        if (copyEvent.clipboardData) {
          copyEvent.clipboardData.setData('text/plain', modifiedText);
        }
      }
    };

    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return null;
};

export default CopyProtection;
