(async()=>{
 try{
  const response=await fetch('releases.json');if(!response.ok)throw new Error('Unavailable');const release=await response.json();
  document.getElementById('version').textContent=release.version;
  for(const platform of ['mac','windows']){
   const asset=release[platform];if(!asset?.url)continue;
   const url=new URL(asset.url);if(url.origin!=='https://github.com'||!url.pathname.startsWith('/CaliBG/valley-ai/releases/download/'))continue;
   const link=document.getElementById(platform+'-download');link.href=url.href;link.classList.remove('disabled');link.removeAttribute('aria-disabled');link.innerHTML='下载安装包 <span aria-hidden="true">↓</span>';
   document.getElementById(platform+'-info').textContent=asset.format+' · '+asset.size+' · '+release.date;
  }
 }catch{document.querySelectorAll('.download-options small').forEach(el=>el.textContent='请从下方版本记录查看安装包')}
})();
