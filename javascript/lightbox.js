(function(){
  function createOverlay(){
    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';

    const content = document.createElement('div');
    content.className = 'lb-content';

    const img = document.createElement('img');
    content.appendChild(img);

    const caption = document.createElement('div');
    caption.className = 'lb-caption';

    const close = document.createElement('button');
    close.className = 'lb-close';
    close.innerHTML = '✕';

    overlay.appendChild(content);
    overlay.appendChild(close);
    overlay.appendChild(caption);
    document.body.appendChild(overlay);

    return { overlay, img, close, caption };
  }

  function openLightbox(src, alt){
    lb.img.src = src;
    lb.caption.textContent = alt || '';
    lb.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lb.overlay.classList.remove('open');
    lb.img.src = '';
    lb.caption.textContent = '';
    document.body.style.overflow = '';
  }

  const lb = createOverlay();

  lb.overlay.addEventListener('click', function(e){
    if (e.target === lb.overlay) closeLightbox();
  });
  lb.close.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeLightbox();
  });

  function attach(){
    const imgs = document.querySelectorAll('.articleContent img');
    imgs.forEach(img => {
      if (img.dataset.lbAttached) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(){

        const src = img.getAttribute('src') || img.dataset.src || img.src;
        const alt = img.getAttribute('alt') || '';
        openLightbox(src, alt);
      });
      img.dataset.lbAttached = '1';
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', attach);
  } else attach();

  window.__lightbox_attach = attach;
})();
