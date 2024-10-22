// Custom function to render the JSON link list as HTML
export const renderLinks = (jsonString: string) => {
  try {
    const links = JSON.parse(jsonString);

    // Render each link as a <li> element and wrap them in <ul> inside a <div>
    const linksHtml = links
      .map(
        (link: {
          title?: string;
          link?: string;
          img?: string;
          des?: string;
        }) => `
        <li class="friend-link-item" data-description="${link.des || ''}" role="listitem">
          <a href="${link.link || ''}" target="_blank" rel="noopener noreferrer" class="friend-link">
            <img src="${link.img || ''}" alt="Avatar of ${link.title || ''}" class="friend-link-img" loading="lazy" />
            <div class="friend-link-content">
              <p class="friend-link-title">${link.title || ''}</p>
            </div>
          </a>
        </li>
      `,
      )
      .join('');

    // Wrap the list of links in a <div> with a class and an <ul>
    return `
    <div class="friends-links">
      <ul class="friends-links-list" role="list">
        ${linksHtml}
      </ul>
    </div>
  `;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return `<>Invalid JSON in links block - ${e.message}</>`;
    }
    return '<>Invalid JSON in links block</>';
  }
};
