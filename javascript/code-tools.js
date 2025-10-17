(function(){
  function addCopyButtons() {
    document.querySelectorAll('pre').forEach(pre => {
      if (pre.dataset.copyAttached) return;
      const wrap = document.createElement('div');
      wrap.className = 'pre-wrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.textContent = '复制';
      btn.addEventListener('click', async function(){
        try {
          await navigator.clipboard.writeText(pre.innerText);
          btn.textContent = '已复制';
          setTimeout(()=> btn.textContent = '复制', 1500);
        } catch(e) {
          console.error('复制失败', e);
        }
      });
      wrap.appendChild(btn);
      pre.dataset.copyAttached = '1';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addCopyButtons);
  else addCopyButtons();
  window.__addCopyButtons = addCopyButtons;
})();
