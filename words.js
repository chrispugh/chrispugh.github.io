async function loadPosts() {
  const container = document.getElementById('posts');

  try {
    const response = await fetch('/posts.json');
    if (!response.ok) throw new Error('No posts file');
    const posts = await response.json();

    container.innerHTML = posts.slice(0, 6).map(post => `
      <a class="post-thumb" href="${post.link}" target="_blank" rel="noopener noreferrer">
        <div class="post-thumb-img">
          ${post.image ? `<img src="${post.image}" alt="">` : ''}
        </div>
        <div class="post-thumb-title">${post.title}</div>
      </a>
    `).join('') + `
      <div class="posts-more"><a href="https://chrispugh.substack.com" target="_blank" rel="noopener noreferrer">Read more</a></div>
    `;
  } catch {
    container.innerHTML = '<p id="posts-error">Posts unavailable right now.</p>';
  }
}

loadPosts();
