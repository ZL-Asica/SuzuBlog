import Script from 'next/script'

const MARKDOWN_ARTICLE_INTERACTIONS_SCRIPT = String.raw`
(() => {
  if (window.__suzuMarkdownInteractions === true) {
    return;
  }

  window.__suzuMarkdownInteractions = true;

  const PREVIEW_CLOSE_DELAY = 220;
  let activePreviewCloseTimer = null;
  let activePreviewTrigger = null;

  const getRoot = () => document.querySelector('.post-content');

  const openImagePreview = (button) => {
    const image = button.querySelector('img');

    if (image == null) {
      return;
    }

    const src = image.currentSrc || image.src;
    const alt = image.alt || 'Image preview';
    const overlay = document.createElement('div');
    const frame = document.createElement('div');
    const title = document.createElement('span');
    const closeButton = document.createElement('button');
    const previewImage = document.createElement('img');
    const caption = document.createElement('span');
    const titleId = 'markdown-image-preview-' + Math.random().toString(36).slice(2);
    const previousOverflow = document.body.style.overflow;
    let isClosing = false;

    const close = () => {
      if (isClosing) {
        return;
      }

      isClosing = true;
      if (activePreviewCloseTimer != null) {
        window.clearTimeout(activePreviewCloseTimer);
      }

      overlay.dataset.visible = 'false';
      document.body.style.overflow = previousOverflow;
      activePreviewCloseTimer = window.setTimeout(() => {
        overlay.remove();
        activePreviewTrigger?.focus({ preventScroll: true });
        activePreviewCloseTimer = null;
        activePreviewTrigger = null;
      }, PREVIEW_CLOSE_DELAY);
    };

    overlay.className = 'markdown-image-preview fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6';
    overlay.dataset.visible = 'false';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', titleId);

    frame.className = 'markdown-image-preview-frame relative flex max-h-full w-full max-w-6xl flex-col items-center gap-3';
    title.id = titleId;
    title.className = 'sr-only';
    title.textContent = 'Image preview: ' + alt;

    closeButton.type = 'button';
    closeButton.className = 'absolute right-2 top-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-2xl leading-none text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white';
    closeButton.setAttribute('aria-label', 'Close image preview');
    closeButton.textContent = '×';

    previewImage.src = src;
    previewImage.alt = alt;
    previewImage.className = 'max-h-[85dvh] max-w-full rounded-md object-contain shadow-2xl';

    caption.className = 'max-w-3xl text-center text-sm leading-relaxed text-white/85';
    caption.textContent = alt;

    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      close();
    });
    overlay.addEventListener('click', close);
    frame.addEventListener('click', (event) => event.stopPropagation());

    frame.append(title, closeButton, previewImage, caption);
    overlay.append(frame);
    document.body.append(overlay);
    activePreviewTrigger = button;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => {
      overlay.dataset.visible = 'true';
      closeButton.focus({ preventScroll: true });
    });
  };

  const handleClick = (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const root = getRoot();

    if (target == null || root == null || !root.contains(target)) {
      return;
    }

    const previewButton = target.closest('button[data-markdown-image-preview]');

    if (previewButton != null) {
      if (previewButton.hasAttribute('data-markdown-image-hydrated')) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      openImagePreview(previewButton);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    document
      .querySelector('.markdown-image-preview[data-visible="true"] button[aria-label="Close image preview"]')
      ?.click();
  };

  document.addEventListener('click', handleClick, true);
  window.addEventListener('keydown', handleKeyDown);
})();
`

/**
 * Runtime image-preview delegation for Markdown rendered as static article DOM.
 */
export function MarkdownArticleInteractions() {
  return (
    <Script id="markdown-article-interactions" strategy="afterInteractive">
      {MARKDOWN_ARTICLE_INTERACTIONS_SCRIPT}
    </Script>
  )
}
