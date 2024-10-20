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
        <li class="friend-link-item" data-description="${link.des || ''}">
          <a href="${link.link || ''}" target="_blank" rel="noopener noreferrer" class="friend-link">
            <img src="${link.img || ''}" alt="${link.title || ''}" class="friend-link-img" loading="lazy" />
            <div class="friend-link-content">
              <h5 class="friend-link-title">${link.title || ''}</h5>
            </div>
          </a>
        </li>
      `,
      )
      .join('');

    // Wrap the list of links in a <div> with a class and an <ul>
    return `
    <div class="friends-links">
      <ul class="friends-links-list">
        ${linksHtml}
      </ul>
    </div>
  `;
  } catch (e) {
    console.error('Invalid JSON format in {% links %} block:', e);
    return '<p>Invalid JSON in links block</p>';
  }
};
