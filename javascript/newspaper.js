let slides = [];  // 改为 let，允许后续赋值

let current = 0;

function showSlide(index) {
  const bg = document.getElementById('bg');
  const container = document.getElementById('text-container');
  const dots = document.querySelectorAll('.dot');

  bg.style.backgroundImage = `url('${slides[index].background}')`;
  container.innerHTML = '';

  slides[index].lines.forEach((line, i) => {
    const div = document.createElement('div');
    div.className = 'line';
    div.style.animationDelay = `${i * 1}s`;
    div.textContent = line;
    container.appendChild(div);
  });

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function setupDots() {
  const dotContainer = document.getElementById('dot-container');
  dotContainer.innerHTML = ''; // 避免多次添加
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => {
      current = i;
      showSlide(current);
    };
    dotContainer.appendChild(dot);
  });
}

fetch('../resource/newspaper.json')
  .then(response => response.json())
  .then(data => {
    slides = data;
    setupDots();
    showSlide(current);
  })
  .catch(error => console.error('加载文件列表失败', error));
