(async()=>{
 try{
  const response=await fetch('releases.json',{cache:'no-store'});if(!response.ok)throw new Error('Unavailable');const release=await response.json();
  document.getElementById('version').textContent=release.version;
  for(const platform of ['mac','windows']){
   const asset=release[platform];if(!asset?.url)continue;
   const url=new URL(asset.url);if(url.origin!=='https://github.com'||!url.pathname.startsWith('/CaliBG/valley-ai/releases/download/'))continue;
   const link=document.getElementById(platform+'-download');link.href=url.href;link.classList.remove('disabled');link.removeAttribute('aria-disabled');link.innerHTML='下载安装包 <span aria-hidden="true">↓</span>';
   document.getElementById(platform+'-info').textContent=asset.format+' · '+asset.size+' · '+release.date;
  }
 }catch{document.querySelectorAll('.download-options small').forEach(el=>el.textContent='请从下方版本记录查看安装包')}
})();

const previewImage = document.getElementById('workspace-preview');
document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => {
 const chat = button.dataset.preview === 'chat';
 previewImage.src = 'assets/' + (chat ? 'conversation.png' : 'workspace.png') + '?v=0.6.0';
 previewImage.alt = chat ? 'Valley AI 实际对话界面：节点引用、修改要求与共享成果时间轴' : 'Valley AI 实际画布：模块、版本、依赖与成果时间轴';
 document.querySelectorAll('[data-preview]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
}));
