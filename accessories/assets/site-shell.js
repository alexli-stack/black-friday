(() => {
  const frames = [...document.querySelectorAll('iframe[data-site-shell]')];
  const sendViewport=()=>frames.forEach(frame=>frame.contentWindow?.postMessage({type:'onelaser-host-size',height:window.innerHeight},location.origin));
  frames.forEach(frame=>frame.addEventListener('load',sendViewport));window.addEventListener('resize',sendViewport);
  window.addEventListener('message', event => {
    if (event.origin !== location.origin) return;
    const frame = frames.find(item => item.contentWindow === event.source);
    if (!frame) return;
    if (event.data?.type === 'onelaser-shell-size' && event.data.part === frame.dataset.siteShell) {
      const height = Number(event.data.height);
      if (Number.isFinite(height) && height > 0 && height < 5000) frame.style.height = `${height}px`;
    }
    if (event.data?.type === 'onelaser-scroll-top') window.scrollTo({top:0,behavior:'smooth'});
  });
})();
