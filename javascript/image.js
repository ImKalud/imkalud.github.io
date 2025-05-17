let imageUrls = [];

function randomImage() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const imageElement = document.getElementById('imageDisplay');
    imageElement.src = imageUrls[randomIndex].link;
    const textElement = document.getElementById('pid');
    textElement.innerText = "Pixiv ID: " + imageUrls[randomIndex].pid; 
}

function downloadImage() {
    const imageUrl = document.getElementById('imageDisplay').src;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'downloaded-image.jpg';
    link.click();
}

fetch('../resource/image.json')
    .then(response => response.json())
    .then(data => {
        imageUrls = data;
    })
    .catch(error => console.error('加载文件列表失败', error));
