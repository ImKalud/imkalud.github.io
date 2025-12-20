(async function() {
  try {
    const resp = await fetch('../resource/articles.json');
    if (!resp.ok) throw new Error('无法读取文章列表');
    const data = await resp.json();
    const container = document.getElementById('article-list');
    if (!container) return;
    // render list
    data.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'article';

      const link = document.createElement('a');
      link.className = 'article-link';
      link.href = `../website/reader.html?id=${idx + 1}`;
      link.textContent = item.title || '未命名文章';
      link.setAttribute('aria-label', `打开文章 ${item.title || ''}`);

      card.appendChild(link);
      container.appendChild(card);
    });
  } catch (e) {
    console.error('加载文件列表失败', e);
  }
})();

async function loadArticle(file, title) {
  try {
    const txtResponse = await fetch(file);
    if (!txtResponse.ok) {
      throw new Error('无法读取文件');
    }
    const txtContent = await txtResponse.text();
    localStorage.setItem(`article-${title}-content`, txtContent);
    window.location.href = '../website/reader.html';
  } catch (error) {
    console.error('加载文章失败:', error);
  }
}
