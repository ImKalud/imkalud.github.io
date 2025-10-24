fetch('../resource/review.json')
  .then(response => response.json())
  .then(data => {
    const animeListContainer = document.getElementById('link-list');
    data.forEach(anime => {
      const animeItem = document.createElement('div');
      animeItem.classList.add('link-item');
      animeItem.innerHTML = `
        <h2>${anime.title}</h2>
      `;
      animeListContainer.appendChild(animeItem);
    });
  })
  .catch(error => {
    console.error('加载ACG数据失败：', error);
  });
