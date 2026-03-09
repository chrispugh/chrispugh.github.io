async function loadPosts() {
  const rssUrl = 'https://chrispugh.substack.com/feed';
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  const container = document.getElementById('posts');

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== 'ok') throw new Error('Feed error');

    container.innerHTML = data.items.map(item => {
      const date = new Date(item.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const tmp = document.createElement('div');
      tmp.innerHTML = item.description;
      const text = tmp.textContent.trim();
      const excerpt = text.length > 160 ? text.slice(0, 160).trimEnd() + '\u2026' : text;

      return `
        <div class="post">
          <div class="post-title"><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></div>
          <div class="post-date">${date}</div>
          ${excerpt ? `<div class="post-excerpt">${excerpt}</div>` : ''}
        </div>
      `;
    }).join('');
  } catch {
    container.innerHTML = '<p id="posts-error">Posts unavailable right now.</p>';
  }
}

loadPosts();
