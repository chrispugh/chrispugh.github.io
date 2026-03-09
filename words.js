async function loadPosts() {
  const container = document.getElementById('posts');

  try {
    const response = await fetch('/posts.json');
    if (!response.ok) throw new Error('No posts file');
    const posts = await response.json();

    container.innerHTML = posts.map(post => {
      const date = new Date(post.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return `
        <div class="post">
          <div class="post-title"><a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a></div>
          <div class="post-date">${date}</div>
          ${post.excerpt ? `<div class="post-excerpt">${post.excerpt}</div>` : ''}
        </div>
      `;
    }).join('');
  } catch {
    container.innerHTML = '<p id="posts-error">Posts unavailable right now.</p>';
  }
}

loadPosts();
