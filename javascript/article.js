fetch('../resource/articles.json')
  .then(response => response.json())
  .then(data => {
    const articleListContainer = document.getElementById('article-list');
    data.forEach(item => {
      const articleDiv = document.createElement('div');
      articleDiv.classList.add('article');
      const articleLink = document.createElement('a');
      articleLink.href = '#';
      articleLink.textContent = item.title;
      articleLink.addEventListener('click', () => {
        localStorage.setItem(`currentArticleTitle`, item.title);
        localStorage.setItem(`article-${item.title}-title`, item.title);
        localStorage.setItem(`article-${item.title}-time`, item.time);
        loadArticle(item.file, item.title);
      });
      articleDiv.appendChild(articleLink);
      articleListContainer.appendChild(articleDiv);
    });
  })
  .catch(error => console.error('加载文件列表失败', error));

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
